import { db } from "../config/db.js";

const table = () => db("sl_spotify_episodes");

export const SpotifyEpisode = {
  getThreeLatestEpisodes: async () => {
    return await db
      .select(
        "episode_id AS episodeId",
        "id AS spotifyId",
        "created_at AS createdAt"
      )
      .from("sl_spotify_episodes")
      .orderBy("created_at", "desc")
      .limit(3);
  },

  getAllEpisodes: async () => {
    return await db
      .select(
        "episode_id AS episodeId",
        "id AS spotifyId",
        "sl_spotify_episodes.created_at AS createdAt",
        db.raw(
          "CONCAT(hris_user_infos.first_name, ' ', LEFT(hris_user_infos.middle_name, 1), '. ', hris_user_infos.last_name) AS createdBy"
        )
      )
      .from("sl_spotify_episodes")
      .join("hris_user_accounts", {
        "sl_spotify_episodes.created_by": "hris_user_accounts.user_id",
      })
      .join("hris_user_infos", {
        "hris_user_accounts.user_id": "hris_user_infos.user_id",
      });
  },

  insertEpisode: async (newEpisode) => {
    return await table().insert(newEpisode);
  },

  updateEpisode: async (episode_id, id) => {
    return await table().where({ episode_id }).update({ id });
  },

  deleteEpisode: async (episode_id) => {
    return await table().where("episode_id", episode_id).del();
  },
};
