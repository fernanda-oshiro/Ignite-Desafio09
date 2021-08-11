import { MovieCard } from "./MovieCard";
import { AutoSizer, Collection, CollectionCellRenderer, CollectionCellSizeAndPositionGetter} from 'react-virtualized'


interface ContentProps {
  selectedGenre: {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  };

  movies: Array<{
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
  }>;
}

export function Content({ selectedGenre, movies }: ContentProps) {
  
  const cellRenderer: CollectionCellRenderer = ({index, key, style}) => {
    return (
      <div key={key} style={style}>
        <MovieCard
          key={movies[index].imdbID}
          title={movies[index].Title}
          poster={movies[index].Poster}
          runtime={movies[index].Runtime}
          rating={movies[index].Ratings[0].Value} 
        />
      </div>
    )
  }

  const cellSizeAndPositionGetter: CollectionCellSizeAndPositionGetter = ({index}) => {

    return {
      height: 400,
      width: 200,
      x: Math.floor(index%3) * 300,
      y: Math.floor(index/3) * 400,
    };
  }
  
  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main style={{height:'90vh', overflowY:'hidden'}}>
        <AutoSizer>
          {({height, width}) => (
            <Collection
              cellCount={movies.length}
              cellRenderer={cellRenderer}
              cellSizeAndPositionGetter={cellSizeAndPositionGetter}
              height={height}
              width={width}
            />
          )}
        </AutoSizer>
      </main>
    </div>
  )
}