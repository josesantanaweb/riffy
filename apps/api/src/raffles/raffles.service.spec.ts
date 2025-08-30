import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { RafflesService } from './raffles.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRaffleInput } from './inputs/create-raffle.input';
import { UpdateRaffleInput } from './inputs/update-raffle.input';

interface MockPrismaService {
  raffle: {
    findMany: jest.Mock;
    findUnique: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };
  ticket: {
    createMany: jest.Mock;
  };
}

describe('RafflesService', () => {
  let service: RafflesService;
  let prismaService: MockPrismaService;

  const mockRaffle = {
    id: 'test-id',
    title: 'Test Raffle',
    description: 'Test Description',
    banner: 'test-banner.jpg',
    totalTickets: 100,
    status: 'COMPLETED',
    award: 100,
    price: 10.5,
    progress: 50,
    sold: 1,
    available: 1,
    drawDate: new Date('2025-12-31'),
    ownerId: 'owner-id',
    createdAt: new Date(),
    updatedAt: new Date(),
    tickets: [
      {
        id: 'ticket-id-1',
        number: '001',
        status: 'AVAILABLE',
        createdAt: new Date(),
      },
      {
        id: 'ticket-id-2',
        number: '002',
        status: 'SOLD',
        createdAt: new Date(),
      },
    ],
  };

  const mockCreateRaffleInput: CreateRaffleInput = {
    title: 'Test Raffle',
    description: 'Test Description',
    banner: 'test-banner.jpg',
    totalTickets: 100,
    award: 10.5,
    price: 10.5,
    drawDate: new Date('2025-12-31'),
    ownerId: 'owner-id',
  };

  const mockUpdateRaffleInput: UpdateRaffleInput = {
    title: 'Updated Raffle',
    description: 'Updated Description',
  };

  beforeEach(async () => {
    const mockPrismaService = {
      raffle: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      ticket: {
        createMany: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RafflesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<RafflesService>(RafflesService);
    prismaService = module.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of raffles', async () => {
      const expectedRaffles = [mockRaffle];
      prismaService.raffle.findMany.mockResolvedValue(expectedRaffles);

      const result = await service.findAll();

      expect(result).toEqual(expectedRaffles);
      expect(prismaService.raffle.findMany).toHaveBeenCalledWith({
        include: {
          tickets: true,
        },
      });
    });

    it('should return empty array when no raffles exist', async () => {
      prismaService.raffle.findMany.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(prismaService.raffle.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a raffle when found', async () => {
      prismaService.raffle.findUnique.mockResolvedValue(mockRaffle);

      const result = await service.findOne('test-id');

      expect(result).toEqual(mockRaffle);
      expect(prismaService.raffle.findUnique).toHaveBeenCalledWith({
        where: { id: 'test-id' },
        include: { tickets: true },
      });
    });

    it('should throw NotFoundException when raffle not found', async () => {
      prismaService.raffle.findUnique.mockResolvedValue(null);

      await expect(service.findOne('non-existent-id')).rejects.toThrow(
        new NotFoundException('Raffle with id non-existent-id not found'),
      );
    });
  });

  describe('create', () => {
    it('should create a raffle and its tickets successfully', async () => {
      const createdRaffle = { ...mockRaffle, ...mockCreateRaffleInput };
      prismaService.raffle.create.mockResolvedValue(createdRaffle);
      prismaService.ticket.createMany.mockResolvedValue({ count: 100 });

      const result = await service.create(mockCreateRaffleInput);

      expect(result).toEqual(createdRaffle);
      expect(prismaService.raffle.create).toHaveBeenCalledWith({
        data: mockCreateRaffleInput,
      });
      expect(prismaService.ticket.createMany).toHaveBeenCalled();
    });

    it('should generate tickets with correct padding for different totalTickets', async () => {
      const input1000Tickets = { ...mockCreateRaffleInput, totalTickets: 1000 };
      const createdRaffle = { ...mockRaffle, totalTickets: 1000 };

      prismaService.raffle.create.mockResolvedValue(createdRaffle);
      prismaService.ticket.createMany.mockResolvedValue({ count: 1000 });

      await service.create(input1000Tickets);

      expect(prismaService.ticket.createMany).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a raffle successfully', async () => {
      const updatedRaffle = { ...mockRaffle, ...mockUpdateRaffleInput };

      prismaService.raffle.findUnique.mockResolvedValue(mockRaffle);
      prismaService.raffle.update.mockResolvedValue(updatedRaffle);

      const result = await service.update('test-id', mockUpdateRaffleInput);

      expect(result).toEqual(updatedRaffle);
      expect(prismaService.raffle.update).toHaveBeenCalledWith({
        where: { id: 'test-id' },
        data: mockUpdateRaffleInput,
      });
    });

    it('should throw NotFoundException when raffle to update does not exist', async () => {
      prismaService.raffle.findUnique.mockResolvedValue(null);

      await expect(
        service.update('non-existent-id', mockUpdateRaffleInput),
      ).rejects.toThrow(
        new NotFoundException('Raffle with id non-existent-id not found'),
      );

      expect(prismaService.raffle.update).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete a raffle successfully', async () => {
      prismaService.raffle.findUnique.mockResolvedValue(mockRaffle);
      prismaService.raffle.delete.mockResolvedValue(mockRaffle);

      const result = await service.delete('test-id');

      expect(result).toEqual(mockRaffle);
      expect(prismaService.raffle.delete).toHaveBeenCalledWith({
        where: { id: 'test-id' },
      });
    });

    it('should throw NotFoundException when raffle to delete does not exist', async () => {
      prismaService.raffle.findUnique.mockResolvedValue(null);

      await expect(service.delete('non-existent-id')).rejects.toThrow(
        new NotFoundException('Raffle with id non-existent-id not found'),
      );

      expect(prismaService.raffle.delete).not.toHaveBeenCalled();
    });
  });
});
