import { InputType, PartialType } from '@nestjs/graphql';
import { CreateBingoInput } from './create-bingo.input';

@InputType()
export class UpdateBingoInput extends PartialType(CreateBingoInput) {}
