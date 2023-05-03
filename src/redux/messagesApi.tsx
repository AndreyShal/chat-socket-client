import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { io, Socket } from "socket.io-client";

const socket = io("http://localhost:8080/");

export const messagesApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (build) => ({
    getMessages: build.query<any[], any>({
      // query: (channel) => `messages/${channel}`,
      query: (limit = "") => `/${limit && `_limit=${limit}`}`,
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        // create a websocket connection when the cache subscription starts

        try {
          // дождитесь разрешения первоначального запроса, прежде чем продолжить
          await cacheDataLoaded;

          //   когда данные получены из сокет-соединения с сервером,
          //   если это сообщение и для соответствующего канала,
          //   обновите результат нашего запроса полученным сообщением
          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            console.log("data", data);
            //   if (!isMessage(data) || data.channel !== arg) return
            // if (data || data.channel !== arg) return;

            updateCachedData((draft) => {
              draft.push(data);
            });
          };

          socket.on("response", listener);
        } catch {
          // no-op в случае, если `cacheEntryRemoved` разрешается до `cacheDataLoaded`,
          // в этом случае `cacheDataLoaded` выдаст
        }
        // cacheEntryRemoved разрешится, когда подписка на кэш больше не будет активной
        await cacheEntryRemoved;
        // выполните действия по очистке, как только обещание `cacheEntryRemoved` будет выполнено
        socket.close();
      },
    }),
  }),
});

export const { useGetMessagesQuery } = messagesApi;
