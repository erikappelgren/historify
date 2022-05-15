import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TimeTerm, TimePeriod } from './PersonalPage'

interface Props {
    rangeTerm: TimeTerm
    timePeriodRange: TimePeriod
}

export interface Track {
    name: string
    index: number
    image: string
    imageSize: number
    artistname: string
    link: string
}

const GetTracks = ({ rangeTerm, timePeriodRange }: Props) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState(searchParams.get("access_token"))
    const [trackList, setTrackList] = useState<Track[]>([])
    useEffect(() => {
        const params = new URLSearchParams()
        params.append('time_range', rangeTerm)
        params.append('limit', '25')
        params.append('offset', '0')

        fetch('http://localhost:5005/tracks/' + rangeTerm, {
            credentials: 'include'
        }) // credentials
            .then(res => res.json())
            .then(data => {
                let newTrackList: Track[] = []
                data.map((track: any) => {
                    let newTrack: Track = {
                        artistname: track.artist_name,
                        name: track.track_name,
                        image: track.image_url,
                        index: track.rank,
                        imageSize: 320,
                        link: track.link
                    }
                    newTrackList.push(newTrack)
                });

                setTrackList(newTrackList)
            })
            .catch(err => console.error(err))
    }, [rangeTerm]
    )
    return (
        <div className="PersonalGraphCapsule">
            <div className="GraphList">
                <h3>Your Top Tracks {timePeriodRange}</h3>
                <div className="imageBoxCapsule">
                    {trackList.sort((a: { index: number }, b: { index: number }) => (a.index > b.index) ? 1 : -1)
                    .map((track, index) => {
                        return (
                            <div key={index} className="imageDivBox" 
                                onClick={() => window.open(track.link + "?si=8f0fefabbde14156", "_blank")}> 
                                <p>{track.index}. {track.name} - {track.artistname}</p>
                                <img className='imageDiv' src={track.image} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default GetTracks;