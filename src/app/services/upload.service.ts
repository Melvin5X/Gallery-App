import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2'
import { GalleryImage } from '../models/galleryImage.model'
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database'
import { Upload } from '../models/upload.model'
import * as firebase from 'firebase'

@Injectable()
export class UploadService {
  private basePath = '/uploads';
  private uploads: FirebaseListObservable<GalleryImage[]>;  

  constructor(private ngFire: AngularFireModule, private db: AngularFireDatabase) { }

  uploadFile(upload: Upload) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`)
                        .put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          upload.progress = (uploadTask.snapshot.bytesTransferred/uploadTask.snapshot.totalBytes) * 100;
          console.log(upload.progress);
        },
        (error) => {
          console.log(error);
        },
        (): any => {
          upload.url = uploadTask.snapshot.downloadURL;
          upload.name = upload.file.name;
          this.saveFileData(upload);
        }
    );                      
  }

  saveFileData(upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload);
    console.log('File upload & saved : '+upload.url);
  }
}
