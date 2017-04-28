import {Injectable} from "@angular/core";
import {CommonConverter} from "./CommonConverter";
import {BannerConverter} from "./interfaces/BannerConverter";
import {BannerTO} from "../to/BannerTO";
import {BannerService} from "../service/banner.service";
import {BannerVO} from "../vo/BannerVO";
/**
 * Created by ravisha on 4/21/17.
 */

@Injectable()
export class BannerConverterImpl extends CommonConverter implements BannerConverter {



  bannerVO:BannerVO;

  constructor(private bannerService: BannerService) {
    super()
  }

  addBanner(schoolId: string, bannerTO: BannerTO) {
  }

}
