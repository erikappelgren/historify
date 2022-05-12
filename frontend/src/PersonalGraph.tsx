import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React, { PureComponent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { userInfo } from 'os';


const series2 = [
    {
        name: 'KAnye',
        color: 'red',
        data: [
            { x: 'Week 1', y: 1 },
            { x: 'Week 2', y: 2 },
            { x: 'Week 3', y: 3 },
            { x: 'Week 4', y: 8 },
            { x: 'Week 5', y: 2 },
        ]
    },
    {
        name: 'CARTi',
        color: 'black',
        data: [
            { x: 'Week 1', y: 9 },
            { x: 'Week 2', y: 4 },
            { x: 'Week 3', y: 8 },
            { x: 'Week 4', y: 5 },
            { x: 'Week 5', y: 10 },
        ],
    },
    {
        name: 'Maggio',
        color: 'blue',
        data: [
            { x: 'Week 1', y: 2 },
            { x: 'Week 2', y: 6 },
            { x: 'Week 3', y: 7 },
            { x: 'Week 4', y: 8 },
            { x: 'Week 5', y: 1 },
        ],
    },
    {
        name: 'X-COAST',
        color: 'magenta',
        data: [
            { x: 'Week 1', y: 1 },
            { x: 'Week 2', y: 10 },
            { x: 'Week 3', y: 3 },
            { x: 'Week 4', y: 6 },
            { x: 'Week 5', y: 9 },
        ]
    },
    {
        name: 'Kylie Minogue',
        color: 'Gold',
        data: [
            { x: 'Week 1', y: 3 },
            { x: 'Week 2', y: 10 },
            { x: 'Week 3', y: 4 },
            { x: 'Week 4', y: 2 },
            { x: 'Week 5', y: 4 },
        ]
    },
];

const series = [
    {
        name: 'Drake',
        color: 'red',
        data: [
            { x: 'Week 1', y: 6 },
            { x: 'Week 2', y: 4 },
            { x: 'Week 3', y: 8 },
            { x: 'Week 4', y: 1 },
            { x: 'Week 5', y: 9 },
        ]
    },
    {
        name: 'Elvis',
        color: 'black',
        data: [
            { x: 'Week 1', y: 2 },
            { x: 'Week 2', y: 3 },
            { x: 'Week 3', y: 5 },
            { x: 'Week 4', y: 8 },
            { x: 'Week 5', y: 1 },
        ],
    },
    {
        name: 'Taylor Swift',
        color: 'blue',
        data: [
            { x: 'Week 1', y: 1 },
            { x: 'Week 2', y: 4 },
            { x: 'Week 3', y: 5 },
            { x: 'Week 4', y: 6 },
            { x: 'Week 5', y: 8 },
        ],
    },
    {
        name: 'Lana Del Ray',
        color: 'magenta',
        data: [
            { x: 'Week 1', y: 4 },
            { x: 'Week 2', y: 4 },
            { x: 'Week 3', y: 6 },
            { x: 'Week 4', y: 3 },
            { x: 'Week 5', y: 7 },
        ]
    },
    {
        name: 'Lynyrd Skynyrd',
        color: 'green',
        data: [
            { x: 'Week 1', y: 10 },
            { x: 'Week 2', y: 1 },
            { x: 'Week 3', y: 2 },
            { x: 'Week 4', y: 5 },
            { x: 'Week 5', y: 4 },
        ]
    },
];

interface Artist {
    name: string
    index: number
    image: string
    imageSize: number
}

enum TimeTerm{
    SHORT_TERM = 'short_term',
    MEDIUM_TERM = 'medium_term',
    LONG_TERM = 'long_term'
}

const PersonalPage = () => {
    const [artistData, setArtistData] = useState(series)
    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState(searchParams.get("access_token"))
    const [rangeTerm, setRangeTerm] = useState<TimeTerm>(TimeTerm.LONG_TERM)
    const [artistList, setArtistList] = useState<Artist[]>([])
    function changeArtistData(data: any) {
        setArtistData(data);
    }
    
    console.log(rangeTerm)
    console.log(query)

    useEffect(() => {
        const params = new URLSearchParams()
        params.append('time_range', rangeTerm)
        params.append('limit', '5')
        params.append('offset', '0')

        fetch('https://api.spotify.com/v1/me/top/artists?' + params,
            {
                headers: {
                    'Authorization': 'Bearer ' + query
                }
            })
            .then(res => res.json())
            .then(data => {
                let newArtistList: Artist[] = []
                console.log(data)
                const topartist = data.items
                let count = 1
                topartist.forEach((artist: any) => {
                    let newArtist: Artist = {
                        name: artist.name,
                        image: artist.images[1].url,
                        index: count,
                        imageSize: 320
                    }
                    newArtistList.push(newArtist)
                    count++
                });

                setArtistList(newArtistList)
            })
            .catch(err => console.error(err))
    }, [rangeTerm]
    )


    return (
        <div className="GeneralSpotifyHistoryBox">
            <h3>{userInfo.name}'s Top History This Year</h3>
            <div className="GeneralSpotifyContentCapsule">
                <div className="GeneralSpotifyImageBox" onClick={() => changeArtistData(series2)}>
                    <p>Top Songs</p>
                    <img className="GeneralSpotifyImage" src="https://i.scdn.co/image/ab67616d0000b273a90d170c61fb7d063d47161d"></img>
                </div>
                <div className="GeneralSpotifyImageBox" onClick={() => changeArtistData(series)}>
                    <p>Top Artists</p>
                    <img className="GeneralSpotifyImage" src="https://i.scdn.co/image/ab67616d0000b273e31a279d267f3b3d8912e6f1"></img>
                </div>
                <div className="GeneralSpotifyImageBox">
                    <p>Top Genres</p>
                    <img className="GeneralSpotifyImage" src="https://i.scdn.co/image/ab67616d0000b273ec6e9c13eeed14eedbd5f7c9"></img>
                </div>
            </div>

            <div className="PersonalGraphCapsule">

                <div className="GraphBox">
                    <div id="GraphText">Your Artists Ranking Through Time</div>

                    <LineChart
                        width={800}
                        height={450}
                        data={artistData}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        {artistData.map((s, index) => {
                            return (
                                <Line key={index} type="monotone" stroke={s.color} strokeWidth={3} dot={{ fill: s.color, r: 5 }} name={s.name} dataKey="y" data={s.data} />)
                        })}
                        <XAxis dataKey="x" allowDuplicatedCategory={false} />
                        <YAxis tickCount={10} reversed domain={[1, 10]} interval={0} />
                        <Tooltip />
                    </LineChart>
                </div>
                <div className="GraphList">
                    
                    <h3>Your Top Artists This Month</h3>
                    <div className="TimeTermButtons">
                        <button className="GraphListButton" onClick={() => setRangeTerm(TimeTerm.SHORT_TERM)}>Last Month</button>
                        <button className="GraphListButton" onClick={() => setRangeTerm(TimeTerm.MEDIUM_TERM)}>Last 6 Months</button>
                        <button className="GraphListButton" onClick={() => setRangeTerm(TimeTerm.LONG_TERM)}>Forever</button>
                    </div>
                    {artistList.map((artist, index) => {
                        return (
                            <div className="ArtistList">
                                <div key={index}> {index + 1}. {artist.name}<div className="imageDiv"><img src={artist.image} /></div>  </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default PersonalPage;