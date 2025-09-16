// src/mail/mail.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { ConfigModule } from '@nestjs/config';
import nodemailer from 'nodemailer';

jest.mock('nodemailer');

describe('MailService', () => {
  let service: MailService;
  const sendMailMock = jest.fn().mockResolvedValue({ messageId: 'mock-id' });

  beforeAll(async () => {
    // @ts-ignore
    nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [MailService],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it('should send purchase buyer email', async () => {
    await expect(
      service.sendPurchaseBuyer({
        to: 'buyer@example.com',
        raffleTitle: 'Test Raffle',
        ticketNumbers: ['0001', '0002'],
        price: 100,
        totalPaid: 200,
        buyerName: 'Buyer',
        purchaseDate: new Date().toISOString(),
        raffleUrl: 'http://localhost/raffle/1',
      }),
    ).resolves.toBeDefined();

    expect(sendMailMock).toHaveBeenCalled();
  });
});
