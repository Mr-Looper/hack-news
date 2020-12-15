import { MaxLength, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateNewDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly author: string;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  readonly url: string;

  @IsString()
  @MaxLength(40)
  @IsNotEmpty()
  readonly date: string;

  @IsBoolean()
  readonly deleted: boolean;
}
