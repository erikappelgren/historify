import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TimeTerm, TimePeriod} from './PersonalPage'

interface Props{
    rangeTerm: TimeTerm
    timePeriodRange: TimePeriod
}

export interface Artist {
    name: string
    index: number
    image: string
    imageSize: number
    link: string
}

const GetArtists = ({rangeTerm, timePeriodRange}: Props) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState(searchParams.get("access_token"))
    const [artistList, setArtistList] = useState<Artist[]>([])
    useEffect(() => {
        const params = new URLSearchParams()
        params.append('time_range', rangeTerm)
        params.append('limit', '25')
        params.append('offset', '0')
        
            fetch('http://localhost:5005/artists/' + rangeTerm, {
                credentials: 'include'
            })
            .then(res => res.json())
            .then(data => {
                let newArtistList: Artist[] = []
                data.map((artist: any) => {
                    let newArtist: Artist = {
                        name: artist.artist_name,
                        image: artist.image_url,
                        index: artist.rank,
                        imageSize: 320,
                        link: artist.link
                    }
                    newArtistList.push(newArtist)
                });

                setArtistList(newArtistList)
            })
            .catch(err => console.error(err))
    }, [rangeTerm]
    )
    return(
        <div className="PersonalGraphCapsule">
            <div className="GraphList">
                <h3>Your Top Artists {timePeriodRange}</h3>
                <div className="imageBoxCapsule">
                    {artistList.sort((a: { index: number }, b: { index: number }) => (a.index > b.index) ? 1 : -1)
                    .map((artist, index) => {
                        return (
                            <div key={index} className="imageDivBox" 
                                onClick={()=> window.open(artist.link + "?si=8f0fefabbde14156", "_blank")}> 
                                <p>{artist.index}. {artist.name}</p>
                                <img className='imageDiv' src={artist.image} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default GetArtists;