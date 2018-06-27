import { Time } from "@angular/common";

export class Email{
    sender: string;
    receiver: string;
    subject: string;
    body: string;
    date: string;
    time: string;

    constructor(sen:string, rec:string){
        this.sender = sen;
        this.receiver = rec;
    }
}