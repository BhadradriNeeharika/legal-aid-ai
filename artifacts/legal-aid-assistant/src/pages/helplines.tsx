import React, { useState } from 'react';
import { useGetHelplines, getGetHelplinesQueryKey } from '@workspace/api-client-react';
import { Phone, Search, ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const CATEGORIES = [
  "All",
  "Domestic Violence",
  "Sexual Harassment (POSH)",
  "Dowry Harassment",
  "Women's Safety Laws",
  "General Legal"
];

export default function HelplinesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: helplines = [], isLoading } = useGetHelplines(
    selectedCategory === "All" ? undefined : { category: selectedCategory },
    { query: { queryKey: getGetHelplinesQueryKey(selectedCategory === "All" ? undefined : { category: selectedCategory }) } }
  );

  const filteredHelplines = helplines.filter(h => 
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    h.phone.includes(searchQuery)
  );

  return (
    <Layout>
      <div className="p-6 md:p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Phone className="w-8 h-8 text-primary" />
            Emergency Helplines
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            National and state-level helplines for immediate assistance, counseling, and rescue. These numbers are toll-free and available 24/7 in most cases.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search helplines..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-11 bg-card border-border"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                className={`rounded-full ${selectedCategory === cat ? 'bg-primary' : 'bg-background hover:bg-accent'}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="h-32 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        ) : filteredHelplines.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHelplines.map((helpline) => (
              <Card key={helpline.id} className="overflow-hidden border-border hover:shadow-md transition-shadow group">
                <CardHeader className="pb-2 bg-muted/30">
                  <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                      {helpline.name}
                    </CardTitle>
                    <ShieldAlert className="w-5 h-5 text-muted-foreground shrink-0" />
                  </div>
                  {helpline.category && (
                    <Badge variant="secondary" className="w-fit mt-2 font-normal text-xs bg-background">
                      {helpline.category}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="pt-4">
                  <a 
                    href={`tel:${helpline.phone}`} 
                    className="inline-flex items-center gap-2 text-2xl font-bold text-primary hover:underline"
                  >
                    <Phone className="w-5 h-5" />
                    {helpline.phone}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-2xl border border-dashed border-border">
            <Phone className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium text-foreground mb-2">No helplines found</h3>
            <p className="text-muted-foreground">Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}