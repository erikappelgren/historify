import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Track, TimeTerm, TimePeriod } from './PersonalPage'
import  PlayListJson  from './PlaylistJson.json'

enum SelectCountry {
    SWEDEN = "SWEDEN",
    GLOBAL = "GLOBAL",
    USA = "USA",
    ARGENTINA = "ARGENTINA",
}

enum CountryText {
    SWEDEN = "in Sweden",
    GLOBAL = "Globally",
    USA = "in USA",
    ARGENTINA = "in Argentina",
}

const data = PlayListJson;

const GetPublicPlaylist = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState(searchParams.get("access_token"))
    const [playListTracks, setplayListTracks] = useState<Track[]>([])
    const [playlistCountry, setPlaylistCountry] = useState<string>(SelectCountry.SWEDEN)
    const [countryText, setCountryText] = useState<string>(CountryText.SWEDEN)
    const [selectedButton, setSelectedButton] = useState<number>(1)

    const OnClickHandler = (Country: any) => {
        //TODO FIX Type
        setPlaylistCountry(Country.name);
        setCountryText(Country.phrase);
        setSelectedButton(Country.index);
    }

    useEffect(() => {

        fetch('http://localhost:5005/playlists/' + playlistCountry, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                let newplayListTracks: Track[] = []
                let count = 1
                data.forEach((track: any) => {
                    let newTrack: Track = {
                        artistname: track.artist_name,
                        name: track.track_name,
                        image: track.image_url,
                        index: track.rank,
                        imageSize: 320,
                        link: track.link
                    }
                    newplayListTracks.push(newTrack)
                    count++
                });

                setplayListTracks(newplayListTracks)
            })
            .catch(err => console.error(err))

    }, [playlistCountry]
    )
    return (
        <div className="PersonalGraphCapsule">
            <div className="GraphList">
                <div className="TimeTermButtons">
                    {data.map(Country => {
                        return (
                            <button key={Country.name}
                                className={selectedButton === Country.index 
                                ? "GraphListButtonSelected" : "GraphListButton"} 
                                onClick={() => 
                                OnClickHandler(Country)}>
                                {Country.name}
                            </button>
                        )
                    })}
                </div>
                <h3>Top Tracks {countryText} </h3>
                <div className="imageBoxCapsule">
                    {playListTracks.map((tracks, index) => {
                        return (
                            <div key={index} className="imageDivBox" 
                                onClick={() => window.open(tracks.link + "?si=8f0fefabbde14156", "_blank")}> 
                                <p>{index + 1}. {tracks.name} - {tracks.artistname}</p>
                                <img className='imageDiv' src={tracks.image} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default GetPublicPlaylist;