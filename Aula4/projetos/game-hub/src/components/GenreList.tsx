import {
  List,
  Image,
  HStack,
  Button,
  Heading,
  Spinner,
} from "@chakra-ui/react";

import useGenres, { Genre } from "../hooks/useGenres";
import { getCroppedImageURL } from "../services/image-urls";

interface Props {
  selectedGenre: Genre | null;
  onSelectGenre: (genre: Genre) => void;
}

const GenreList = ({ selectedGenre, onSelectGenre }: Props) => {
  const { data, isLoading } = useGenres();
  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading fontSize="2xl" marginBottom={3}>
        Genres
      </Heading>
      <List.Root listStyleType="none">
        {data.map((genre) => (
          <List.Item key={genre.id} paddingY={1}>
            <HStack overflow="hidden">
              <Image
                src={getCroppedImageURL(genre.image_background)}
                borderRadius={8}
                objectFit="cover"
                boxSize={8}
                flexShrink={0}
              />
              <Button
                whiteSpace="normal"
                textAlign="left"
                justifyContent="flex-start"
                fontWeight={genre.id === selectedGenre?.id ? "bold" : "normal"}
                onClick={() => onSelectGenre(genre)}
                fontSize="lg"
                variant="plain"
                overflow="hidden"
                textWrap="wrap"
                flex={1}
              >
                {genre.name}
              </Button>
            </HStack>
          </List.Item>
        ))}
      </List.Root>
    </>
  );
};

export default GenreList;
