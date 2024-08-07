import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Cat, Heart, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [likes, setLikes] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const catImages = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sleeping_cat_on_her_back.jpg/1200px-Sleeping_cat_on_her_back.jpg",
  ];

  const catFacts = [
    "Cats have been domesticated for over 4,000 years.",
    "An adult cat has 30 teeth.",
    "Cats can jump up to six times their length.",
    "A group of cats is called a 'clowder'.",
    "Cats spend 70% of their lives sleeping.",
    "Cats have over 20 vocalizations, including purring, meowing, and chirping.",
    "A cat's hearing is much more sensitive than a human's or dog's.",
  ];

  const catBreeds = [
    { name: "Siamese", origin: "Thailand", personality: "Vocal and affectionate" },
    { name: "Persian", origin: "Iran", personality: "Calm and gentle" },
    { name: "Maine Coon", origin: "United States", personality: "Friendly and playful" },
    { name: "Bengal", origin: "United States", personality: "Active and curious" },
    { name: "Scottish Fold", origin: "Scotland", personality: "Sweet-tempered and quiet" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % catImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-purple-200 to-pink-200">
      <motion.h1 
        className="text-6xl font-bold mb-8 text-center text-purple-800"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Feline Fascination
      </motion.h1>
      
      <div className="max-w-4xl mx-auto">
        <Carousel className="mb-8">
          <CarouselContent>
            {catImages.map((image, index) => (
              <CarouselItem key={index}>
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img 
                    src={image}
                    alt={`Cute cat ${index + 1}`}
                    className="mx-auto object-cover w-full h-[400px] rounded-lg shadow-lg"
                  />
                  <Button 
                    className="absolute bottom-4 right-4 bg-red-500 hover:bg-red-600"
                    onClick={() => setLikes(likes + 1)}
                  >
                    <Heart className="mr-2 h-4 w-4" /> Like ({likes})
                  </Button>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        
        <Tabs defaultValue="facts" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="facts">Feline Facts</TabsTrigger>
            <TabsTrigger value="breeds">Cat Breeds</TabsTrigger>
          </TabsList>
          <TabsContent value="facts">
            <Card>
              <CardHeader>
                <CardTitle><Info className="inline-block mr-2" />Feline Facts</CardTitle>
                <CardDescription>Fascinating information about our purr-fect companions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {catFacts.map((fact, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center space-x-3 bg-purple-100 p-3 rounded-lg"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Cat className="h-6 w-6 text-purple-600" />
                      <span className="text-purple-800">{fact}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <Card>
              <CardHeader>
                <CardTitle><Cat className="inline-block mr-2" />Popular Cat Breeds</CardTitle>
                <CardDescription>Discover the unique characteristics of various feline friends</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {catBreeds.map((breed, index) => (
                    <motion.li 
                      key={index}
                      className="bg-pink-100 p-4 rounded-lg"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-lg text-pink-800">{breed.name}</span>
                        <Badge variant="secondary">Origin: {breed.origin}</Badge>
                      </div>
                      <p className="text-pink-700">{breed.personality}</p>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
