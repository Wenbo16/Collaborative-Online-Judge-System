import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {
	editor: any;
	language: string = 'Java';
	languages: string[] = ['Java', 'C++', 'Python'];
	languageConv = {'Java': 'java', 'C++':'c_cpp', 'Python':'python' };

	sessionId: string;

	defaultContent = {
    'Java': `public class Example {
	public static void main(String[] args) { 
	    // Type your Java code here 
	} 
}`,
    'C++': `#include <iostream> 
using namespace std; 
int main() { 
  // Type your C++ code here 
  return 0; 
}`, 
    'Python': `class Solution: 
   def example(): 
       # Write your Python code here`
  }


	constructor(@Inject('collaboration') private collaborationService,
				private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.params.subscribe((params) => {
			this.sessionId = params['id'];
			console.log(this.sessionId);
			this.initEditor();
		}
	)}

	initEditor(): void {
		this.editor = ace.edit('editor');
		this.editor.setTheme('ace/theme/eclipse');
		this.editor.setFontSize(18);

		this.editor.$blockScrolling = Infinity;

		// this.editor.getSession().setMode('ace/mode/java');
		// this.editor.setValue(this.defaultContent['Java']);
		
		this.resetEditor();

		// set up a socket, and send a message to server
		this.collaborationService.init(this.editor, this.sessionId);  
		this.editor.lastAppliedChange = null;
		
		this.collaborationService.restoreBuffer();

		this.editor.on('change', (e) => {
			console.log('JSON.stringify(e): ' + JSON.stringify(e));
			if (this.editor.lastAppliedChange != e) {
				this.collaborationService.change(JSON.stringify(e));
			}
		});

		//cursor change callback
		this.editor.getSession().getSelection().on('changeCursor', () => {
			let cursor = this.editor.getSession().getSelection().getCursor();
			console.log('CLIENT! CURSOR' + JSON.stringify(cursor));
			this.collaborationService.cursorMove(JSON.stringify(cursor));
		})


	}

	resetEditor(): void {
		console.log('Resetting editor');
		this.editor.getSession().setMode(`ace/mode/${this.languageConv[this.language].toLowerCase()}`);
		this.editor.setValue(this.defaultContent[this.language]);
	}

	setLanguage(language: string) {
		this.language = language;
		// add a map for language and js file name
		// this.editor.getSession().setMode(`ace/mode/${language.toLowerCase()}`);
		// this.editor.setValue(this.defaultContent[language]);
		this.resetEditor();
	}

	submit() {
		let userCodes = this.editor.getValue();
		console.log('submit....' + userCodes);
	}

}
