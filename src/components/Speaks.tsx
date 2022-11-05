import type { Speak } from "../../types";
import dayjs from "dayjs";

type Props = {
  speaks: Speak[];
};

export const Speaks = ({ speaks }: Props) => {
  return (
    <ul>
      {speaks.map((speak) => (
        <li key={speak.date}>
          <div>
            <time dateTime={dayjs(speak.date).format("YYYY-MM-DD")}>
              {dayjs(speak.date).format("YYYY年MM月DD日")}
            </time>
            <a href={speak.eventUrl} target="_blank" rel="noreferrer">
              {speak.eventName}
            </a>
          </div>
          <div>
            {speak.slideUrl ? (
              <a href="{{speak.slideUrl}}" target="_blank" rel="noreferrer">
                {speak.sessionTitle}
              </a>
            ) : (
              <span>{speak.sessionTitle}</span>
            )}
            {speak.videoArchiveUrl && (
              <span>
                (
                <a
                  href="{{speak.videoArchiveUrl}}"
                  target="_blank"
                  rel="noreferrer"
                >
                  動画
                </a>
                )
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};
