import { Component } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html'
})
export class PostCreateComponent {
  enteredValue = '';
  newPost = 'No content';
  onAddPost(postInput: HTMLTextAreaElement) {
    // console.log(postInput.value);
    // console.dir(postInput.value);
    // this.newPost = postInput.value;
    this.newPost = this.enteredValue;
  }
}
