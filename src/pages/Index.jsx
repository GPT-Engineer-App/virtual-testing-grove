import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Cat, Heart, Info } from "lucide-react";

const Index = () => {
  const [likes, setLikes] = useState(0);

  const catFacts = [
    "Cats have been domesticated for over 4,000 years.",
    "An adult cat has 30 teeth.",
    "Cats can jump up to six times their length.",
    "A group of cats is called a 'clowder'.",
    "Cats spend 70% of their lives sleeping.",
  ];

  const catBreeds = [
    { name: "Siamese", origin: "Thailand" },
    { name: "Persian", origin: "Iran" },
    { name: "Maine Coon", origin: "United States" },
    { name: "Bengal", origin: "United States" },
    { name: "Scottish Fold", origin: "Scotland" },
  ];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-purple-100 to-pink-100">
      <motion.h1 
        className="text-5xl font-bold mb-8 text-center text-purple-800"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        All About Cats
      </motion.h1>
      
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="relative mb-8"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg" 
            alt="Cute cat" 
            className="mx-auto object-cover w-full h-[400px] rounded-lg shadow-lg"
          />
          <Button 
            className="absolute bottom-4 right-4 bg-red-500 hover:bg-red-600"
            onClick={() => setLikes(likes + 1)}
          >
            <Heart className="mr-2 h-4 w-4" /> Like ({likes})
          </Button>
        </motion.div>
        
        <Tabs defaultValue="facts" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="facts">Feline Facts</TabsTrigger>
            <TabsTrigger value="breeds">Cat Breeds</TabsTrigger>
          </TabsList>
          <TabsContent value="facts">
            <Card>
              <CardHeader>
                <CardTitle><Info className="inline-block mr-2" />Feline Facts</CardTitle>
                <CardDescription>Interesting information about our furry friends</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {catFacts.map((fact, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Cat className="h-5 w-5 text-purple-500" />
                      <span>{fact}</span>
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
                <CardDescription>Some well-known feline varieties</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {catBreeds.map((breed, index) => (
                    <motion.li 
                      key={index}
                      className="flex justify-between items-center"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="font-semibold">{breed.name}</span>
                      <span className="text-sm text-gray-500">Origin: {breed.origin}</span>
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
