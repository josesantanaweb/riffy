import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import { readFile } from 'fs/promises';
import { join } from 'path';
import Handlebars from 'handlebars';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private config: ConfigService) {
    const host = this.config.get<string>('SMTP_HOST');
    const port = Number(this.config.get<string>('SMTP_PORT') || 587);
    const user = this.config.get<string>('SMTP_USER');
    const pass = this.config.get<string>('SMTP_PASS');

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: user && pass ? { user, pass } : undefined,
    } as any);
  }

  private async renderTemplate(name: string, context: Record<string, any>) {
    const templatesDir = join(process.cwd(), 'src', 'mail', 'templates');
    const file = join(templatesDir, `${name}.hbs`);
    const source = await readFile(file, 'utf8');
    const tpl = Handlebars.compile(source);
    return tpl(context);
  }

  async sendMail(
    to: string,
    subject: string,
    template: string,
    context: Record<string, any>,
  ) {
    try {
      const html = await this.renderTemplate(template, context);
      const from =
        this.config.get<string>('MAIL_FROM') || 'no-reply@example.com';
      const info = await this.transporter.sendMail({ from, to, subject, html });
      this.logger.log(
        `Email sent to ${to} subject=${subject} id=${info.messageId}`,
      );
      return info;
    } catch (err) {
      const msg =
        err && typeof err === 'object' && 'message' in err
          ? (err as any).message
          : String(err);
      this.logger.error(`Failed to send email to ${to}: ${msg}`);
      throw err;
    }
  }

  async sendPurchaseBuyer(opts: {
    to: string;
    raffleTitle: string;
    ticketNumbers: string[];
    price: number;
    totalPaid: number;
    buyerName: string;
    purchaseDate: string;
    raffleUrl: string;
  }) {
    const subject = `Confirmación de compra - ${opts.raffleTitle}`;
    const context = {
      raffleTitle: opts.raffleTitle,
      ticketNumbers: opts.ticketNumbers,
      price: opts.price.toFixed(2),
      totalPaid: opts.totalPaid.toFixed(2),
      buyerName: opts.buyerName,
      purchaseDate: opts.purchaseDate,
      raffleUrl: opts.raffleUrl,
    };
    return this.sendMail(opts.to, subject, 'purchase-buyer', context);
  }

  async sendPurchaseSeller(opts: {
    to: string;
    raffleTitle: string;
    ticketNumbers: string[];
    price: number;
    totalPaid: number;
    buyerName: string;
    sellerName: string;
    purchaseDate: string;
    raffleUrl: string;
  }) {
    const subject = `Nuevo pedido - ${opts.raffleTitle}`;
    const context = {
      raffleTitle: opts.raffleTitle,
      ticketNumbers: opts.ticketNumbers,
      price: opts.price.toFixed(2),
      totalPaid: opts.totalPaid.toFixed(2),
      buyerName: opts.buyerName,
      sellerName: opts.sellerName,
      purchaseDate: opts.purchaseDate,
      raffleUrl: opts.raffleUrl,
    };
    return this.sendMail(opts.to, subject, 'purchase-seller', context);
  }
}
