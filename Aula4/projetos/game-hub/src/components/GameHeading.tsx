import { Heading } from "@chakra-ui/react";
import { GameQuery } from "../App";

interface Props {
  gameQuery: GameQuery;
}

const gameHeading = ({ gameQuery }: Props) => {
  const heading = `${gameQuery.platform?.name || ""} ${
    gameQuery.genre?.name || ""
  } Games`;

  console.log(`gameQuery: ${JSON.stringify(gameQuery)}`);
  return (
    <Heading as="h1" marginY={5} fontSize='5xl' marginLeft={2}>
      {heading}
    </Heading>
  );
};

export default gameHeading;
