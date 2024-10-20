import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

interface ImageData {
  photo_name: string;  // Ensure this property exists
  url: string;         // Ensure this property exists
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  images: any[] = [];
  loading = true;
  email: string | null = localStorage.getItem('email'); // Use a string or null
  selectedFile: File | null = null;
  backendUrl = 'http://127.0.0.1:5000'; // Change this to match your backend URL

  constructor(private http: HttpClient,private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.fetchImages();
  }

  fetchImages() {
    if (this.email) { // Ensure email is not null
      this.http.get<ImageData[]>(`${this.backendUrl}/get_images?email=${this.email}`).subscribe(
        (data) => {
          this.images = data.map(image => ({
            photo_name: image.photo_name,
            url: `${this.backendUrl}/images/${image.url.split('/').pop()}` // Use the new image route
          }));
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching images:', error);
          this.loading = false;
        }
      );
    } else {
      console.error('No email found in local storage');
      this.loading = false;
    }
  }
  
  

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadPhoto(photoName: string) {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('email', this.email!); // Use non-null assertion

      // Append photo name to the form data
      formData.append('photo_name', photoName);

      this.http.post(`${this.backendUrl}/upload`, formData).subscribe(
        (response) => {
          console.log('Photo uploaded successfully:', response);
          this.fetchImages(); // Refresh the image list
        },
        (error) => {
          console.error('Error uploading photo:', error);
        }
      );
    } else {
      console.error('No file selected for upload');
    }
  }

  deletePhoto(image: ImageData) {
    const confirmed = confirm(`Are you sure you want to delete ${image.photo_name}?`);
    if (confirmed) {
      this.http.post(`${this.backendUrl}/delete`, { email: this.email, photo_name: image.photo_name }).subscribe(
        () => {
          this.images = this.images.filter((img) => img.photo_name !== image.photo_name);
        },
        (error) => {
          console.error('Error deleting photo:', error);
        }
      );
    }
  }
}
