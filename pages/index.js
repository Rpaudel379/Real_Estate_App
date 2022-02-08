import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import Property from "../components/Property";

import RentImg from "../assets/images/rent.jpg";
import BuyImg from "../assets/images/buy.jpg";

const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  buttonText,
  LinkName,
  imageUrl,
}) => {
  return (
    <Flex
      flexWrap={"wrap"}
      justifyContent={"center"}
      alignItems={"center"}
      m="10"
    >
      <Image src={imageUrl} width={500} height={300} alt="banner" />

      <Box p="5">
        <Text color={"gray"} fontSize="small" fontWeight={"medium"}>
          {purpose}
        </Text>{" "}
        <Text fontSize="3xl" fontWeight={"bold"}>
          {title1} <br /> {title2}
        </Text>{" "}
        <Text fontSize="lg" paddingTop={3} paddingBottom={3} color="gray.700">
          {desc1} <br /> {desc2}
        </Text>
        <Button fontSize={"xl"}>
          <Link href={LinkName}>{buttonText}</Link>
        </Button>
      </Box>
    </Flex>
  );
};

export default function Home({ propertiesForRent, propertiesForSale }) {
  return (
    <Box>
      <Banner
        purpose={"RENT A HOME"}
        title1="Rental Homes for"
        title2={"Everyone"}
        desc1="Explore Apartments, Villas, Homes"
        desc2={"and more"}
        buttonText="Explore Renting"
        LinkName={"/search?purpose=for-rent"}
        imageUrl={RentImg}
      />
      <Flex flexWrap={"wrap"}>
        {propertiesForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      <Banner
        purpose={"Buy A HOME"}
        title1="Find, Buy & Own your"
        title2={"Dream Home"}
        desc1="Explore Apartments, Villas, Homes"
        desc2={"and more"}
        buttonText="Explore Buying"
        LinkName={"/search?purpose=for-sale"}
        imageUrl={BuyImg}
      />
      <Flex flexWrap={"wrap"}>
        {propertiesForSale.map((property) => (
          <Property property={property} key={property.id} />
        ))}{" "}
      </Flex>
    </Box>
  );
}

export const getStaticProps = async () => {
  const propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );

  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
};
