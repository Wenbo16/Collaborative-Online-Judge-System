import docker
import os
import shutil
import uuid
from docker.errors import *
from langs import SOURCE_FILE_NAMES, BINARY_NAMES, BUILD_COMMANDS, EXECUTE_COMMANDS

client = docker.from_env()

IMAGE_NAME = 'wenbofeng/online-judge'

CURRENT_DIR = os.path.dirname(os.path.realpath(__file__))

# get tmp dir path
TEMP_BUILD_DIR = '%s/tmp' % CURRENT_DIR


def load_image():
    try:
        client.images.get(IMAGE_NAME)
    except ImageNotFound:
        print 'image not found locally, loading from docker hub...'
        client.images.pull(IMAGE_NAME)
    except APIError:
        print 'image not found locally. docker hub is not accessible'
        return
    print 'Image: [%s] loaded' % IMAGE_NAME



#
    # @function
    # @name build_and_run
    # @description Function that creates a directory with the folder name provided by uuid
    # and then copies contents of folder named Payload to the created folder, this newly created folder will be mounted
    # on the Docker Container. A file with the name specified in file_name variable of this class is created and all the
    # code written in 'code' variable of this class is copied into this file.
    # Summary: This function produces a folder that contains the source file and 2 scripts, this folder is mounted to our
    # Docker container when we run it.
    # @param {code language}
#

def build_and_run(code, lang):
    result = {'build': None, 'run': None, 'error': None}

    # create an unique dir name
    source_file_parent_dir_name = uuid.uuid4()

    # source file dir in server
    source_file_host_dir = '%s/%s' % (TEMP_BUILD_DIR, source_file_parent_dir_name)

    #source file dir for docker
    source_file_guest_dir = '/test/%s' % (source_file_parent_dir_name)

    make_dir(source_file_host_dir)

    with open('%s/%s' % (source_file_host_dir, SOURCE_FILE_NAMES[lang]), 'w') as source_file:
        source_file.write(code)

    # compile code
    try:
        client.containers.run(
            image = IMAGE_NAME,
            command='%s %s' % (BUILD_COMMANDS[lang], SOURCE_FILE_NAMES[lang]),
            volumes={source_file_host_dir: {'bind': source_file_guest_dir, 'mode': 'rw'}},
            working_dir=source_file_guest_dir)
        print 'source built'
        result['build'] = 'OK!!!!'

    except ContainerError as e:
        print 'Build failed'
        result['build'] = e.stderr
        shutil.rmtree(source_file_host_dir)
        return result

    # run code
    try:
        log = client.containers.run(
            image=IMAGE_NAME,
            command='%s %s' % (EXECUTE_COMMANDS[lang], BINARY_NAMES[lang]),
            volumes={source_file_host_dir: {'bind': source_file_guest_dir, 'mode': 'rw'}},
            working_dir=source_file_guest_dir)
        print 'Accepted!!!'
        result['run'] = log

    except ContainerError as e:
        print 'Execution failed'
        result['run'] = e.stderr
        shutil.rmtree(source_file_host_dir)
        return result

    shutil.rmtree(source_file_host_dir)
    return result

def make_dir(dir):
    try:
        os.mkdir(dir)
        print 'temp build directory [%s] created.' % dir
    except OSError:
        print 'temp build directory [%s] exists.' % dir