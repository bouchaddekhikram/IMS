import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast/toast.service';// Adjust the import path

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  isVisible = false;
  message = '';

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.toastService.getMessage().subscribe((data) => {
      this.message = data.message;
      this.isVisible = true;
      setTimeout(() => this.hide(), 3000); // Auto-hide after 3 seconds
    });
  }

  hide() {
    this.isVisible = false;
  }
}
