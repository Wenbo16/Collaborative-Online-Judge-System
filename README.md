## What is Executor? ##
Executor is a *Docker* based sandbox to run user submitted code and return the output to your app. The system will test the code in an isolated environment. This way you do not have to worry about untrusted code possibly damaging your server intentionally or unintentionally.

You can use this system to allow your users to compile their code right in the browser.

Check the example work at:

 - Basic Example: [compile.remoteinterview.io][1]
 - Prettified View: [codepad.remoteinterview.io][2]

## How does it work? ##

The client-side app submits the code and the languageID to the server through the API. The API then creates a new *Docker* container and runs the code using the compiler/interpreter of that language. The program runs inside a virtual machine with limited resources and has a time-limit for execution (20s by default). Once the output is ready it is sent back to the client-side app. The *Docker* container is destroyed and all the files are deleted from the server.

No two coders have access to each other’s *Docker* or files.
