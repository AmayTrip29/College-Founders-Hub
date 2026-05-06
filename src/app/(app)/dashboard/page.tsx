import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Users, Library, CheckCircle } from "lucide-react";
import { DashboardChart } from "@/components/dashboard/dashboard-chart";

const leaderboardData = [
  { rank: 1, name: "Alice Johnson", points: 1250, avatar: "https://placehold.co/40x40.png?text=AJ" },
  { rank: 2, name: "Bob Williams", points: 1100, avatar: "https://placehold.co/40x40.png?text=BW" },
  { rank: 3, name: "Charlie Brown", points: 980, avatar: "https://placehold.co/40x40.png?text=CB" },
  { rank: 4, name: "Diana Miller", points: 950, avatar: "https://placehold.co/40x40.png?text=DM" },
  { rank: 5, name: "Ethan Davis", points: 870, avatar: "https://placehold.co/40x40.png?text=ED" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's a snapshot of your activity.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Tasks Completed"
          value="42"
          icon={<CheckCircle className="h-6 w-6 text-muted-foreground" />}
          description="+5 since last week"
        />
        <StatCard
          title="Active Collaborations"
          value="8"
          icon={<Briefcase className="h-6 w-6 text-muted-foreground" />}
          description="2 new invites"
        />
        <StatCard
          title="New Connections"
          value="12"
          icon={<Users className="h-6 w-6 text-muted-foreground" />}
          description="+3 since last week"
        />
        <StatCard
          title="Resources Shared"
          value="15"
          icon={<Library className="h-6 w-6 text-muted-foreground" />}
          description="+2 pitch decks"
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <DashboardChart />

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Leaderboard</CardTitle>
            <CardDescription>Top contributors in the community.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((user) => (
                  <TableRow key={user.rank}>
                    <TableCell className="font-medium">{user.rank}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{user.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  description,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
