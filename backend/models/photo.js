export class Photo {
  constructor(photo) {
    this.id = photo.id;
    this.fileName = photo.file_name;
    this.contentUrl = photo.content_url;
    this.contentType = photo.content_type;
  }
}
