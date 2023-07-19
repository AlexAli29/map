import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceDto } from './dto/place.dto';
import { AccessTokenAuthGuard } from 'src/auth/guards/access-token.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/entity/user';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post()
  @UseGuards(AccessTokenAuthGuard)
  async addPlace(
    @Res() response,
    @Body() dto: PlaceDto,
    @CurrentUser() user: User,
  ) {
    this.placeService.togglePlace(dto, user);

    return response.status(200).send();
  }
}
