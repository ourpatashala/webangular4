/**
 * Created by ravisha on 4/27/17.
 */
import {BannerTO} from "../../to/BannerTO";
/**
 * Created by ravisha on 4/21/17.
 */


export interface BannerConverter {
  addBanner(schoolId : string,bannerTO: BannerTO);
}
