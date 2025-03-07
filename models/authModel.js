import { db } from "../config/db.js";

const userAccountTable = "hris_user_accounts";
const userInfos = "user_infos";

export const Auth = {
  authenticate: async (email) => {
    return await db.transaction(async (trx) => {
      return await trx(userAccountTable)
        .select(
          `${userAccountTable}.user_email`,
          `${userAccountTable}.user_password`,
          `${userAccountTable}.user_key`
        )
        .innerJoin(
          userInfos,
          `${userAccountTable}.user_id`,
          `${userInfos}.user_id`
        )
        .where(`${userAccountTable}.user_email`, email)
        .first();
    });
  },
};
