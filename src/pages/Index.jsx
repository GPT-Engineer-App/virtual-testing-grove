import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Cat, Heart, Info, ChevronUp, Paw } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Index = () => {
  const [likes, setLikes] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [parent] = useAutoAnimate();
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const [isHovering, setIsHovering] = useState(false);

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
    { name: "Siamese", origin: "Thailand", personality: "Vocal and affectionate", funFact: "Known for their blue almond-shaped eyes and color-point coats." },
    { name: "Persian", origin: "Iran", personality: "Calm and gentle", funFact: "Recognized for their long, luxurious coats and flat faces." },
    { name: "Maine Coon", origin: "United States", personality: "Friendly and playful", funFact: "One of the largest domestic cat breeds, often called 'gentle giants'." },
    { name: "Bengal", origin: "United States", personality: "Active and curious", funFact: "Their spotted coats resemble those of wild leopards." },
    { name: "Scottish Fold", origin: "Scotland", personality: "Sweet-tempered and quiet", funFact: "Famous for their unique folded ears, caused by a natural genetic mutation." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % catImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-r from-purple-300 to-pink-300">
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/b/b1/Meandering_cute_cat_paw_prints.png')",
          backgroundSize: "cover",
          y: backgroundY,
        }}
      />
      <div className="relative z-10">
        <motion.h1 
          className="text-7xl font-bold py-16 text-center text-purple-900 drop-shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Feline Fascination
        </motion.h1>
        
        <div className="max-w-4xl mx-auto px-4">
          <Carousel className="mb-12">
            <CarouselContent>
              {catImages.map((image, index) => (
                <CarouselItem key={index}>
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    onHoverStart={() => setIsHovering(true)}
                    onHoverEnd={() => setIsHovering(false)}
                  >
                    <img 
                      src={image}
                      alt={`Cute cat ${index + 1}`}
                      className="mx-auto object-cover w-full h-[500px] rounded-lg shadow-2xl"
                    />
                    <motion.button 
                      className="absolute bottom-4 right-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
                      onClick={() => setLikes(likes + 1)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart className="mr-2 h-5 w-5 inline-block" />
                      <span>{likes}</span>
                    </motion.button>
                    <AnimatePresence>
                      {isHovering && (
                        <motion.div
                          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <p className="text-white text-2xl font-bold">Meow-nificent!</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          
          <Tabs defaultValue="facts" className="mb-12">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="facts" className="text-lg">Feline Facts</TabsTrigger>
              <TabsTrigger value="breeds" className="text-lg">Cat Breeds</TabsTrigger>
            </TabsList>
            <TabsContent value="facts">
              <Card className="bg-white/80 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl text-purple-800">
                    <Info className="mr-2" />Feline Facts
                  </CardTitle>
                  <CardDescription className="text-lg">Fascinating information about our purr-fect companions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4" ref={parent}>
                    {catFacts.map((fact, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-center space-x-3 bg-purple-100 p-4 rounded-lg shadow-md"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Paw className="h-6 w-6 text-purple-600 flex-shrink-0" />
                        <span className="text-purple-800 text-lg">{fact}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="breeds">
              <Card className="bg-white/80 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl text-pink-800">
                    <Cat className="mr-2" />Popular Cat Breeds
                  </CardTitle>
                  <CardDescription className="text-lg">Discover the unique characteristics of various feline friends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4" ref={parent}>
                    {catBreeds.map((breed, index) => (
                      <motion.li 
                        key={index}
                        className="bg-pink-100 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-xl text-pink-800">{breed.name}</span>
                          <Badge variant="secondary" className="text-sm">Origin: {breed.origin}</Badge>
                        </div>
                        <p className="text-pink-700 text-lg mb-2">{breed.personality}</p>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="sm">
                                Fun Fact
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{breed.funFact}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <motion.button
        className="fixed bottom-8 right-8 bg-purple-600 text-white p-4 rounded-full shadow-lg z-50"
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronUp className="h-6 w-6" />
      </motion.button>

      <motion.div 
        className="fixed bottom-0 left-0 right-0 h-2 bg-purple-300"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
};

export default Index;
