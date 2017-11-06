import { Injectable } from '@angular/core';
import { COLORS } from '../../assets/colors';

declare var io: any;
declare var ace: any;

@Injectable()
export class CollaborationService {
	collaborationSocket: any;
	clientsInfo: Object = { };
	// {
	// 	'socket.id': {
	//		'marker':xxx
	//	}	
	// }
	clientNum = 0;

	constructor() { }


	init(editor: any, sessionId: string):void {
		// set up a socket
		console.log(sessionId);
		// io(url, options)
		this.collaborationSocket = io(window.location.origin, {query:'sessionId=' + sessionId});

		// if we get a message event from server
		// this.collaborationSocket.on('message', (message) => {
		// 	console.log('message from server: ' + message);
		// })   // if we get a message event 

		// listener for change event
		this.collaborationSocket.on('change', (delta: string) => {
			console.log('collaboration service: editor changed by ' + delta);
			delta = JSON.parse(delta);
			editor.lastAppliedChange = delta;
			editor.getSession().getDocument().applyDeltas([delta]);
		})


		// listener for cursor move events
		this.collaborationSocket.on('cursorMove', (cursor: string) => {
			// cursor: row: xxx, column: xxx, socketId: xxx
			console.log('RECEIVED from SERVER cursor move: ' + cursor);

			cursor = JSON.parse(cursor);
			const x = cursor['row'];
			const y = cursor['column'];
			let changeClientId = cursor['socketId'];
			let session = editor.getSession();

			if (changeClientId in this.clientsInfo) {
				session.removeMarker(this.clientsInfo[changeClientId]['marker']);
			} else {
				this.clientsInfo[changeClientId] = {};
				let css = document.createElement('style');
				css.type = 'text/css';
				css.innerHTML = '.editor_cursor_' + changeClientId
					+ '{ position: absolute; background: ' + COLORS[this.clientNum] + ';'
					+ 'z-index: 100; width: 3px !important; }';
				document.body.appendChild(css);
				this.clientNum++;
			}

			// Draw a new one
			let Range = ace.require('ace/range').Range;
			let newMarker = session.addMarker(new Range(x, y, x, y+1),
			                                'editor_cursor_' + changeClientId,
			                                true);
			this.clientsInfo[changeClientId]['marker'] = newMarker;

		})

	}

	change(delta: string):void{
		this.collaborationSocket.emit('change', delta);
	}

	cursorMove(cursor: string):void{
		this.collaborationSocket.emit('cursorMove', cursor);
	}

	restoreBuffer(): void {
		this.collaborationSocket.emit('restoreBuffer');
	}
}
