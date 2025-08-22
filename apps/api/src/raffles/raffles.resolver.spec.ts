/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { RafflesResolver } from './raffles.resolver';
import { RafflesService } from './raffles.service';
import { CreateRaffleInput } from './inputs/create-raffle.input';
import { UpdateRaffleInput } from './inputs/update-raffle.input';

describe('RafflesResolver', () => {
  let resolver: RafflesResolver;
  let service: jest.Mocked<RafflesService>;

  const mockRaffle = {
    id: 'test-id',
    title: 'Test Raffle',
    description: 'Test Description',
    banner: 'test-banner.jpg',
    logo: 'test-logo.jpg',
    primaryColor: '#ff0000',
    secondaryColor: '#00ff00',
    totalTickets: 100,
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
    logo: 'test-logo.jpg',
    primaryColor: '#ff0000',
    secondaryColor: '#00ff00',
    totalTickets: 100,
    price: 10.5,
    drawDate: new Date('2025-12-31'),
    ownerId: 'owner-id',
  };

  const mockUpdateRaffleInput: UpdateRaffleInput = {
    title: 'Updated Raffle',
    description: 'Updated Description',
  };

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RafflesResolver,
        {
          provide: RafflesService,
          useValue: mockService,
        },
      ],
    }).compile();

    resolver = module.get<RafflesResolver>(RafflesResolver);
    service = module.get<RafflesService>(
      RafflesService,
    ) as jest.Mocked<RafflesService>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('raffles', () => {
    it('should return an array of raffles', async () => {
      const expectedRaffles = [mockRaffle];
      service.findAll.mockResolvedValue(expectedRaffles);

      const result = await resolver.raffles();

      expect(result).toEqual(expectedRaffles);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no raffles exist', async () => {
      service.findAll.mockResolvedValue([]);

      const result = await resolver.raffles();

      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('raffle', () => {
    it('should return a raffle by id', async () => {
      service.findOne.mockResolvedValue(mockRaffle);

      const result = await resolver.raffle('test-id');

      expect(result).toEqual(mockRaffle);
      expect(service.findOne).toHaveBeenCalledWith('test-id');
    });

    it('should pass the correct id to service', async () => {
      service.findOne.mockResolvedValue(mockRaffle);

      await resolver.raffle('another-id');

      expect(service.findOne).toHaveBeenCalledWith('another-id');
    });
  });

  describe('create', () => {
    it('should create a new raffle', async () => {
      service.create.mockResolvedValue(mockRaffle);

      const result = await resolver.create(mockCreateRaffleInput);

      expect(result).toEqual(mockRaffle);
      expect(service.create).toHaveBeenCalledWith(mockCreateRaffleInput);
    });

    it('should pass the correct input to service', async () => {
      const customInput = { ...mockCreateRaffleInput, title: 'Custom Title' };
      service.create.mockResolvedValue(mockRaffle);

      await resolver.create(customInput);

      expect(service.create).toHaveBeenCalledWith(customInput);
    });
  });

  describe('update', () => {
    it('should update a raffle', async () => {
      const updatedRaffle = { ...mockRaffle, title: 'Updated Title' };
      service.update.mockResolvedValue(updatedRaffle);

      const result = await resolver.update('test-id', mockUpdateRaffleInput);

      expect(result).toEqual(updatedRaffle);
      expect(service.update).toHaveBeenCalledWith(
        'test-id',
        mockUpdateRaffleInput,
      );
    });

    it('should pass the correct parameters to service', async () => {
      service.update.mockResolvedValue(mockRaffle);

      await resolver.update('another-id', mockUpdateRaffleInput);

      expect(service.update).toHaveBeenCalledWith(
        'another-id',
        mockUpdateRaffleInput,
      );
    });
  });

  describe('delete', () => {
    it('should delete a raffle', async () => {
      service.delete.mockResolvedValue(mockRaffle);

      const result = await resolver.delete('test-id');

      expect(result).toEqual(mockRaffle);
      expect(service.delete).toHaveBeenCalledWith('test-id');
    });

    it('should pass the correct id to service', async () => {
      service.delete.mockResolvedValue(mockRaffle);

      await resolver.delete('another-id');

      expect(service.delete).toHaveBeenCalledWith('another-id');
    });
  });

  describe('service dependency', () => {
    it('should have service injected', () => {
      expect(service).toBeDefined();
    });

    it('should call service methods correctly', () => {
      // Test that all service methods are properly mocked
      expect(service.findAll).toBeDefined();
      expect(service.findOne).toBeDefined();
      expect(service.create).toBeDefined();
      expect(service.update).toBeDefined();
      expect(service.delete).toBeDefined();
    });
  });
});
