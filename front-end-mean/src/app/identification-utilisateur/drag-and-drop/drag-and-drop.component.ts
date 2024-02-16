import { Component, EventEmitter, Output } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent {
  imageUrl: string | ArrayBuffer | null = null;
  imageFile: File| null = null
  @Output() fileUploaded: EventEmitter<File> = new EventEmitter<File>();
  constructor(private uploadService: UploadService){}
  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.fileUploaded.emit(file);
      this.uploadService.uploadFile(file)
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.highlightDropZone(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.highlightDropZone(false);
  }
  highlightDropZone(active: boolean) {
    const dropZone = document.querySelector('.drop-zone');
    if (dropZone) {
      if (active) {
        dropZone.classList.add('drag-over');
      } else {
        dropZone.classList.remove('drag-over');
      }
    }
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileUploaded.emit(file);
      this.uploadService.uploadFile(file)
    }
  }

  // previewImage(file: File) {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imageUrl = reader.result;
  //   };
  //   reader.readAsDataURL(file);
  // }
}
