import style from '../sidebar/sidebar.module.css'

interface SidebarVideoProps {
    title: string;
    author: string;
    url: string;
    endpoint: string;
    onClickVideo: (urlVideo: string) => void;
}

export function Sidebar({ title, author, url, endpoint, onClickVideo }: SidebarVideoProps) {
    return (
        <div className={style.movie} >
            <div className={style.thumbnail} key={url}>
                <button
                    type='button'
                    name={url}
                    onClick={(e) => onClickVideo(e?.target.name)}
                >
                    <video>
                        <source src={`${endpoint}${url}`} />
                    </video>
                </button>
            </div>

            <div className={style.detailsVideo}>
                <span>{title}</span>

                <span className={style.authorName}>{author}</span>
            </div>
        </div >
    )
}