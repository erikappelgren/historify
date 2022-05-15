import { useEffect, useState } from "react";
import GetPublicPlaylist from "./GetPublicPlaylist";
import { Track } from "./GetTracks";
import PersonalPage from "./PersonalPage";

export const temp = () => {

    const [newPlaylistSweden, setNewplayListSweden] = useState<Track[]>();
    


    useEffect(() => {
        fetch('http://localhost:5005/playlists/' + 'SWEDEN', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                let PlayListSweden: Track[] = []
                data.map((track: any) => {
                    let newTrack: Track = {
                        artistname: track.artist_name,
                        name: track.track_name,
                        image: track.image_url,
                        index: track.rank,
                        imageSize: 320,
                        link: track.link
                    }
                    PlayListSweden.push(newTrack);
                    setNewplayListSweden(PlayListSweden);
                });

            })
            .catch(err => console.error(err))
    }, [])
    
    return(
        <PersonalPage />
    )
}