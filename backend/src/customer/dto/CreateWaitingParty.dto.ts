
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateWaitingPartyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  partySize: number;
}
