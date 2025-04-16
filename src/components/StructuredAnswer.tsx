
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { BookOpen, CheckCircle, AlertCircle, HelpCircle, Settings, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionIconProps {
  sectionType: string;
}

const SectionIcon: React.FC<SectionIconProps> = ({ sectionType }) => {
  switch (sectionType.toLowerCase()) {
    case "introduction":
      return <BookOpen className="h-5 w-5 text-purple-600" />;
    case "issue analysis":
      return <HelpCircle className="h-5 w-5 text-blue-600" />;
    case "troubleshooting steps":
      return <Settings className="h-5 w-5 text-orange-600" />;
    case "root cause analysis":
      return <AlertCircle className="h-5 w-5 text-red-600" />;
    case "escalation and handling":
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    default:
      return <ChevronDown className="h-5 w-5 text-gray-600" />;
  }
};

interface StructuredAnswerProps {
  answer: string;
}

const StructuredAnswer: React.FC<StructuredAnswerProps> = ({ answer }) => {
  // Parse the markdown-style answer into sections
  const sections = parseAnswerIntoSections(answer);

  return (
    <div className="structured-answer bg-white rounded-lg shadow-sm">
      <Accordion type="single" collapsible className="w-full">
        {sections.map((section, index) => (
          <AccordionItem key={index} value={`section-${index}`}>
            <AccordionTrigger className="hover:bg-purple-50 px-4 py-3 text-left flex items-center">
              <div className="flex items-center gap-3">
                <SectionIcon sectionType={section.title} />
                <span className="font-medium text-gray-800">{section.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pt-2 pb-4">
              {section.content.map((item, itemIndex) => {
                if (item.type === "text") {
                  return <p key={itemIndex} className="text-gray-700 mb-3">{item.text}</p>;
                } else if (item.type === "bullet") {
                  return (
                    <div key={itemIndex} className="ml-6 mb-4">
                      <h4 className="font-medium text-gray-800 mb-2">{item.title}</h4>
                      <ul className="list-disc ml-6 space-y-2">
                        {item.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="text-gray-700">{point}</li>
                        ))}
                      </ul>
                    </div>
                  );
                } else if (item.type === "nested") {
                  return (
                    <Collapsible key={itemIndex} className="ml-3 mb-4 border-l-2 border-purple-200 pl-4">
                      <CollapsibleTrigger className="flex items-center gap-2 hover:text-purple-700">
                        <ChevronDown className="h-4 w-4" />
                        <h4 className="font-medium">{item.title}</h4>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pt-2 pl-6">
                        <ul className="list-disc space-y-2">
                          {item.points.map((point, pointIndex) => (
                            <li key={pointIndex} className="text-gray-700">{point}</li>
                          ))}
                        </ul>
                      </CollapsibleContent>
                    </Collapsible>
                  );
                }
                return null;
              })}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

// Helper function to parse the markdown-style response into structured sections
function parseAnswerIntoSections(answer: string) {
  if (!answer || answer.trim() === '') {
    return [];
  }

  const sections = [];
  const lines = answer.split("\n").filter(line => line.trim());
  
  let currentSection: any = null;
  let currentBullet: any = null;
  let currentNested: any = null;

  for (const line of lines) {
    // Section header
    if (line.match(/^\d+\.\s+\*\*([^*]+)\*\*/)) {
      if (currentSection) {
        sections.push(currentSection);
      }
      const title = line.match(/^\d+\.\s+\*\*([^*]+)\*\*/)[1].trim();
      currentSection = { title, content: [] };
      currentBullet = null;
      currentNested = null;
    }
    // Bullet point with title
    else if (line.match(/^\s*-\s+\*\*([^*]+)\*\*:/)) {
      if (currentSection) { // Check if currentSection exists before adding to it
        const title = line.match(/^\s*-\s+\*\*([^*]+)\*\*:/)[1].trim();
        currentBullet = { type: "bullet", title, points: [] };
        currentSection.content.push(currentBullet);
        currentNested = null;
      }
    }
    // Nested bullet point with title
    else if (line.match(/^\s+-\s+\*\*([^*]+)\*\*:/)) {
      if (currentSection) { // Check if currentSection exists before adding to it
        const title = line.match(/^\s+-\s+\*\*([^*]+)\*\*:/)[1].trim();
        currentNested = { type: "nested", title, points: [] };
        currentSection.content.push(currentNested);
      }
    }
    // Regular bullet point
    else if (line.trim().startsWith("-")) {
      const text = line.replace(/^\s*-\s+/, "").trim();
      if (currentNested) {
        currentNested.points.push(text);
      } else if (currentBullet) {
        currentBullet.points.push(text);
      } else if (currentSection) { // Add check to ensure currentSection exists
        currentSection.content.push({ type: "text", text });
      }
    }
    // Regular text
    else {
      if (currentSection) { // Check if currentSection exists before adding to it
        currentSection.content.push({ type: "text", text: line.trim() });
      } else {
        // If we encounter text before any section header, create a default section
        currentSection = { title: "Information", content: [{ type: "text", text: line.trim() }] };
      }
    }
  }

  // Don't forget to push the last section
  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}

export default StructuredAnswer;
