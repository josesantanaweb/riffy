import { Mutation, Resolver } from '@nestjs/graphql';
import { SeedsService } from './seeds.service';

@Resolver()
export class SeedsResolver {
  constructor(private readonly seedsService: SeedsService) {}

  @Mutation(() => Boolean, {
    name: 'executeSeed',
  })
  async executeSeed(): Promise<boolean> {
    return this.seedsService.executeSeed();
  }
}
