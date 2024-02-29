import { MatSnackBar } from "@angular/material/snack-bar";

export function openSnackBar(text:string, snackBarRef?: MatSnackBar) {
    if(snackBarRef) {
    snackBarRef.open(text, 'Ok', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000,
    })}};