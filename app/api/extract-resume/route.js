import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

const resumeSchema = z.object({
  firstName: z.string().describe("The first name of the person"),
  lastName: z.string().describe("The last name of the person"),
  email: z.string().describe("The email address"),
  contactNumber: z.string().describe("The phone/contact number, including country code if available"),
  workExperiences: z
    .array(
      z.object({
        title: z.string().describe("Job title"),
        company: z.string().describe("Company name"),
        description: z.string().describe("Detailed description of responsibilities and achievements for this role"),
      }),
    )
    .describe("A list of work experiences, each with job title, company, and a detailed description"),
  education: z
    .array(
      z.object({
        degree: z.string().describe("Degree obtained"),
        institution: z.string().describe("Educational institution name"),
        years: z.string().describe("Years attended or graduated"),
      }),
    )
    .describe("A list of educational qualifications"),
  skills: z.array(z.string()).describe("Skills, competencies, and technical abilities as a list of strings"),
})

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get("resume")

    if (!file) {
      return new Response("No file uploaded", { status: 400 })
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    if (!allowedTypes.includes(file.type)) {
      return new Response("Invalid file type. Please upload a PDF or Word document.", { status: 400 })
    }

    const result = await generateObject({
      model: openai("gpt-4o"),
      messages: [
        {
          type: "text",
          text: `Please extract the following information from this resume document:
              - First Name
              - Last Name  
              - Email Address
              - Contact/Phone Number (include country code if present)
              - Work Experiences (provide as a list of objects, each with 'title', 'company', and a detailed 'description' of responsibilities and achievements)
              - Education (provide as a list of objects, each with 'degree', 'institution', and 'years' attended/graduated)
              - Skills (provide as a list of individual strings)
              
              If any information is not found, return an empty string for that field or an empty array for lists.
              For work experience and education descriptions, provide comprehensive summaries.`,
        },
        {
          type: "file",
          data: await file.arrayBuffer(),
          mimeType: file.type,
        },
      ],
      schema: resumeSchema,
    })

    return Response.json(result.object)
  } catch (error) {
    console.error("Error processing resume:", error)
    return new Response("Failed to process resume", { status: 500 })
  }
}
