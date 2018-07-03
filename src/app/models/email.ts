import { Time } from "@angular/common";

export class Email{
    sender: string;
    receiver: string;
    subject: string;
    body: string;
    date: string;
    time: string;

    constructor(sen:string, rec:string,sub: string, bo:string){
        this.sender = sen;
        this.receiver = rec;
        this.subject = sub;
        this.body = bo;
        this.date = '12-may-2018';
        this.time = '01:30';
    }
}