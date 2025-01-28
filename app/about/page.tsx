"use client";
import Image from "next/image";
import { images } from "@/lib/images";

const FOUNDERS = [
  {
    name: "Cash Hilinski",
    role: "Co-Founder",
    image: images.founders.cash,
  },
  {
    name: "Finn B. Jarvi",
    role: "Co-Founder",
    image: images.founders.finn,
  },
];

const UVA_STUDENTS = [
  {
    name: "Kaylee Tate",
    role: "UVA Student",
    image: images.defaultProfile,
  },
  {
    name: "Lexie Hobbs",
    role: "UVA Student",
    image: images.defaultProfile,
  },
  {
    name: "Kiro Moussa",
    role: "UVA Student",
    image: images.defaultProfile,
  },
  {
    name: "Neha Nair",
    role: "UVA Student",
    image: images.defaultProfile,
  },
  {
    name: "Oyindamola Akintola",
    role: "UVA Student",
    image: images.defaultProfile,
  },
  {
    name: "Sabrina Morency",
    role: "UVA Student",
    image: images.defaultProfile,
  },
  {
    name: "Christian Wang",
    role: "UVA Student",
    image: images.defaultProfile,
  },
  {
    name: "Sophie",
    role: "UVA Student",
    image: images.defaultProfile,
  },
];

export default function AboutPage() {
  return (
    <div className="mt-24">
      {/* Hero Section */}
      <section className="relative top-0 flex items-center border-b border-fg py-20 text-bg">
        <div className="absolute inset-0 " />

        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4">
            <span className="text-sm font-semibold text-accent-alt bg-bg py-2 px-3 rounded-sm">
              About Us
            </span>
            <h1 className="mt-6 text-5xl lg:text-7xl font-serif font-bold text-bg leading-tight">
              Shaping Policy Through Research
            </h1>
            <p className="mt-6 text-xl text-bg max-w-3xl">
              A student-led think tank dedicated to advancing public policy
              through rigorous analysis and innovative solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="relative py-20 z-10 bg-bg border-b border-fg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-fg mb-6">
                What is Perrin?
              </h2>
              <p className="text-fg/75 leading-relaxed mb-6">
                The Perrin Institute is a pioneering student-led think tank
                established at the University of Virginia. We serve as a bridge
                between academic research and practical policy implementation,
                focusing on creating innovative solutions for today{"'"}s most
                pressing public policy challenges.
              </p>
              <p className="text-fg/75 leading-relaxed">
                Our organization uniquely combines the fresh perspectives of
                student researchers with academic rigor and real-world policy
                experience. Through our research fellowship program, we empower
                the next generation of policy leaders while producing actionable
                insights for policymakers.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src={images.heroResearch}
                alt="Research at Perrin"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* UVA Students Section */}
      <section className="relative bg-bg py-20 border-b border-fg">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-fg mb-6 text-center">
            UVA Students
          </h2>
          <p className="text-fg/75 text-center max-w-3xl mx-auto mb-12">
            Meet our talented team of University of Virginia students working to
            shape the future of public policy.
          </p>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            {UVA_STUDENTS.map((student, index) => (
              <div key={index} className="text-center">
                <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={student.image}
                    alt={student.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-fg mb-1">
                  {student.name}
                </h3>
                <p className="text-accent-alt-2 font-medium text-sm mb-1">
                  {student.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="relative bg-bg py-20 border-b border-fg">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-fg mb-6 text-center">
            Our Founders
          </h2>
          <p className="text-fg/75 text-center max-w-3xl mx-auto mb-12">
            Perrin Institute was founded by two visionary UVA students committed
            to bridging the gap between academic research and practical policy
            implementation.
          </p>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {FOUNDERS.map((founder, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-fg mb-2">
                  {founder.name}
                </h3>
                <p className="text-accent-alt-2 font-medium">{founder.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative bg-bg py-20 border-b border-fg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-fg mb-6">Our Mission</h2>
              <p className="text-fg/75 leading-relaxed mb-6">
                The Perrin Institute is a student-led think tank at the
                University of Virginia, dedicated to fostering innovative policy
                solutions through rigorous research and analysis. We bring
                together diverse perspectives and emerging scholars to address
                pressing challenges in public policy.
              </p>
              <p className="text-fg/75 leading-relaxed">
                Our work spans multiple policy areas including economic
                development, environmental sustainability, education reform, and
                social justice. Through collaboration with academic experts and
                policy practitioners, we aim to bridge the gap between research
                and practical policy implementation.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src={images.heroResearch}
                alt="Research at Perrin"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative bg-bg py-20 border-b border-fg">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-fg mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Academic Excellence",
                description:
                  "Commitment to rigorous research methodology and evidence-based analysis in all our work.",
              },
              {
                title: "Innovation",
                description:
                  "Fostering creative solutions and fresh perspectives on complex policy challenges.",
              },
              {
                title: "Impact",
                description:
                  "Focusing on practical policy solutions that can create meaningful change in society.",
              },
            ].map((value, index) => (
              <div key={index} className="bg-bg p-8 rounded-lg shadow-xs">
                <h3 className="text-xl font-bold text-fg mb-4">
                  {value.title}
                </h3>
                <p className="text-fg/75">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="relative bg-bg py-20 border-b border-fg">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-fg mb-6">Join Our Mission</h2>
          <p className="text-fg/75 max-w-2xl mx-auto mb-8">
            We{"'"}re always looking for passionate individuals who want to
            contribute to meaningful policy research and make a difference in
            public policy.
          </p>
          <a
            href="/contact"
            className="inline-block bg-accent-alt-2 text-bg px-8 py-3 rounded-lg 
              hover:bg-accent-alt-2 transition-colors"
          >
            Get Involved
          </a>
        </div>
      </section>
    </div>
  );
}
