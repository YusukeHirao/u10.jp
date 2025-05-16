<script lang="ts">
  import type { Speak } from "../../types";
  import dayjs from "dayjs";

  export let speaks: Speak[];
</script>

<ul>
  {#each speaks as speak}
    <li>
      <div>
        <time dateTime={dayjs(speak.date).format("YYYY-MM-DD")}>
          {dayjs(speak.date).format("YYYY年MM月DD日")}
        </time>{" "}
        <a href={speak.eventUrl} target="_blank">
          {speak.eventName}
        </a>
      </div>
      <div>
        {#if speak.slideUrl}
          <a href={speak.slideUrl} target="_blank">
            {speak.sessionTitle}
          </a>
        {:else}
          <span>{speak.sessionTitle}</span>
        {/if}
        {#if speak.videoArchiveUrl}
          {" "}
          <span>
            (
            <a href={speak.videoArchiveUrl} target="_blank"> 動画 </a>
            )
          </span>
        {/if}
      </div>
    </li>
  {/each}
</ul>
