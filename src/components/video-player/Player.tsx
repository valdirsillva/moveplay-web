import ReactPlayer from "react-player";
import style from './video.module.css'

interface PlayerProps {
    source: string | undefined;
    playWidth: number;
    playHeight: number;
}

export function Player({ source, playWidth, playHeight }: PlayerProps) {
    return (
        <div className={style.frameVideo}>
            <ReactPlayer
                url={`${source}`}
                playing={true}
                controls={true}
                width={playWidth}
                height={playHeight}
            />
        </div>
    )
}
