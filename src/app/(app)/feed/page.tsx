"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, MessageSquare, Share2, Send, Loader2 } from "lucide-react";
import * as React from "react";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import type { User } from "firebase/auth";

const initialFeedPosts = [
  {
    id: 1,
    author: { name: 'Alice Johnson', avatar: 'https://placehold.co/40x40.png?text=AJ' },
    content: "Just had a eureka moment for a new app that connects local farmers directly with consumers. Think 'Etsy for fresh produce'. Seeking feedback on the concept and potential pitfalls. What are your thoughts?",
    likes: 42,
    comments: 8,
  },
  {
    id: 2,
    author: { name: 'Bob Williams', avatar: 'https://placehold.co/40x40.png?text=BW' },
    content: "I'm struggling with user acquisition for my SaaS startup. We've tried content marketing and some social media ads, but the CAC is too high. What are some bootstrapped marketing strategies that have worked for you?",
    likes: 78,
    comments: 15,
  },
  {
    id: 3,
    author: { name: 'Charlie Brown', avatar: 'https://placehold.co/40x40.png?text=CB' },
    content: "What's the best tech stack for a social media-style application in 2024? I'm debating between a classic REST API with React Native or going all-in with a BaaS like Firebase/Supabase. Speed of development is key.",
    likes: 55,
    comments: 23,
  },
];

export default function FeedPage() {
  const { toast } = useToast();
  const [user, setUser] = React.useState<User | null>(null);
  const [newPost, setNewPost] = React.useState("");
  const [isPosting, setIsPosting] = React.useState(false);
  const [feedPosts, setFeedPosts] = React.useState(initialFeedPosts);
  const [likedPosts, setLikedPosts] = React.useState<number[]>([]);

  React.useEffect(() => {
    return auth.onAuthStateChanged(setUser);
  }, []);

  const handlePost = () => {
    if (!newPost.trim()) return;

    setIsPosting(true);
    setTimeout(() => {
      const postToAdd = {
        id: Math.random(),
        author: { 
          name: user?.displayName ?? 'Anonymous User',
          avatar: user?.photoURL ?? 'https://placehold.co/40x40.png'
        },
        content: newPost,
        likes: 0,
        comments: 0,
      };
      setFeedPosts(prev => [postToAdd, ...prev]);
      setNewPost("");
      setIsPosting(false);
      toast({
        title: "Post Successful",
        description: "Your thoughts have been shared with the community!",
      });
    }, 1000);
  };
  
  const handleLike = (postId: number) => {
    setFeedPosts(posts => posts.map(p => {
        if (p.id === postId) {
            const alreadyLiked = likedPosts.includes(postId);
            if (alreadyLiked) {
                setLikedPosts(liked => liked.filter(id => id !== postId));
                return { ...p, likes: p.likes - 1 };
            } else {
                setLikedPosts(liked => [...liked, postId]);
                return { ...p, likes: p.likes + 1 };
            }
        }
        return p;
    }));
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
        title: "Link Copied!",
        description: "Feed page URL has been copied to your clipboard."
    });
  }

  return (
    <div className="flex flex-col gap-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold font-headline">Startup Feed</h1>
        <p className="text-muted-foreground">
          Share your ideas and get feedback from the community.
        </p>
      </div>
      
      <Card>
        <CardHeader className="p-4">
            <div className="flex gap-4">
                <Avatar>
                    <AvatarImage src={user?.photoURL ?? "https://placehold.co/40x40.png"} />
                    <AvatarFallback>{user?.displayName?.[0] ?? 'U'}</AvatarFallback>
                </Avatar>
                <Textarea 
                    placeholder="What's on your mind, founder?" 
                    className="text-base"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    disabled={isPosting}
                />
            </div>
        </CardHeader>
        <CardFooter className="p-4 pt-0 flex justify-end">
            <Button onClick={handlePost} disabled={isPosting || !newPost.trim()}>
                {isPosting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                Post
            </Button>
        </CardFooter>
      </Card>
      
      <div className="flex flex-col gap-6">
        {feedPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>{post.author.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{post.author.name}</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{post.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center border-t pt-4">
                <Button variant="ghost" className="text-muted-foreground" onClick={() => handleLike(post.id)}>
                    <ThumbsUp className={`mr-2 ${likedPosts.includes(post.id) ? 'text-primary fill-primary' : ''}`} /> {post.likes}
                </Button>
                <Button variant="ghost" className="text-muted-foreground" onClick={() => toast({ title: "Coming Soon!", description: "Commenting functionality will be added in a future update."})}>
                    <MessageSquare className="mr-2" /> {post.comments} Comments
                </Button>
                <Button variant="ghost" className="text-muted-foreground" onClick={handleShare}>
                    <Share2 className="mr-2" /> Share
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
