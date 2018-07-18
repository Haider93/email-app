import { Time } from "@angular/common";

export class Email{
    id: number;
    sender: string;
    receiver: string;
    subject: string;
    body: string;
    date: string;
    time: string;
    read: string;

    constructor(sen:string, rec:string,sub: string, bo:string){
        this.sender = sen;
        this.receiver = rec;
        this.subject = sub;
        this.body = bo;
        this.read = 'unread';
    }
}