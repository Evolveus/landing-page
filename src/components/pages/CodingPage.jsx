import PageHeader from "../Layout/PageHeader";
import PageFooter from "../Layout/PageFooter";
import "../../styles/coding.css";

const TEST_CASES = [
  { state: "pass", name: "target_found_mid", label: "Target at midpoint" },
  { state: "pass", name: "target_at_start", label: "Target at first index" },
  { state: "pass", name: "target_at_end", label: "Target at last index" },
  { state: "pass", name: "single_element", label: "Single-element array" },
  { state: "pass", name: "not_present", label: "Target not in array" },
  { state: "pass", name: "negative_numbers", label: "Negative integers" },
  { state: "fail", name: "empty_array_guard", label: "Empty array edge case" },
  { state: "fail", name: "duplicate_values", label: "Array with duplicates" },
];

const STATS = [
  { num: "8+", sub: null, cap: "Languages supported" },
  { num: "0.4s", sub: null, cap: "Avg. test-case runtime" },
  { num: "100%", sub: null, cap: "Auto-graded, no manual" },
  { num: "6 / 8", sub: null, cap: "Test cases passed" },
];

function kw(s) { return <span className="tok-kw">{s}</span>; }
function fn(s) { return <span className="tok-fn">{s}</span>; }
function num(s) { return <span className="tok-num">{s}</span>; }

function CodeBlock() {
  return (
    <pre className="pcod-code">
{kw("def")} binary_search(nums, target):{"\n"}
{"    "}left, right = {num("0")}, {fn("len")}(nums) - {num("1")}{"\n"}
{"    "}{kw("while")} left {"<="} right:{"\n"}
{"        "}mid = (left + right) // {num("2")}{"\n"}
{"        "}{kw("if")} nums[mid] == target:{"\n"}
{"            "}{kw("return")} mid{"\n"}
{"        "}{kw("elif")} nums[mid] {"<"} target:{"\n"}
{"            "}left = mid + {num("1")}{"\n"}
{"        "}{kw("else")}:{"\n"}
{"            "}right = mid - {num("1")}{"\n"}
{"    "}{kw("return")} -{num("1")}
    </pre>
  );
}

export default function CodingPage() {
  return (
    <div className="page pcod">
      <PageHeader folio="06" />

      <div className="pcod-stage">
        <div className="pcod-top">
          <div className="kicker">Chapter V — Code &amp; Compile</div>
          <h2 className="pcod-headline">
            Evaluated like a lab examiner
            <br />
            <em>who never misses a test case.</em>
          </h2>
          <p className="pcod-lede">
            Coding questions run student submissions against configured test
            cases automatically. Pass/fail outcomes, runtime, and the same
            audit trail as written exams — no manual inspection required.
          </p>
        </div>

        <div className="pcod-spread">
          <div className="pcod-mock">
            <div className="pcod-mock-bar">
              <span className="pcod-mock-tag">CODING EVALUATOR</span>
              <span className="pcod-mock-meta">Q3 · CS-301 · Python 3</span>
            </div>

            <div className="pcod-mock-body">
              <div className="pcod-mock-eyebrow">PROMPT</div>
              <p className="pcod-mock-q">
                Implement binary search on a sorted integer array. Return the
                index of the target, or −1 if not found.
              </p>

              <div className="pcod-mock-eyebrow pcod-mock-eyebrow--gap">
                SUBMISSION
              </div>
              <CodeBlock />

              <div className="pcod-mock-eyebrow pcod-mock-eyebrow--gap">
                TEST CASES — 6 / 8 passed
              </div>
              <div className="pcod-tests">
                {TEST_CASES.map(({ state, name, label }) => (
                  <div key={name} className="pcod-test-row" data-state={state}>
                    <span className="pcod-test-icon">
                      {state === "pass" ? "✓" : "×"}
                    </span>
                    <span className="pcod-test-name">{name}</span>
                    <span className="pcod-test-label">{label}</span>
                    <b className="pcod-test-result">{state}</b>
                  </div>
                ))}
              </div>

              <div className="pcod-mock-foot">
                <span className="pcod-mock-foot-l">runtime · 0.38s</span>
                <span className="pcod-mock-foot-r">
                  <span>Score</span>
                  <strong>6 / 8</strong>
                </span>
              </div>
            </div>
          </div>

          <aside className="pcod-side">
            <div className="pcod-side-block">
              <div className="caption">How it works</div>
              <ol className="pcod-steps">
                <li>
                  <strong>Faculty configures test cases</strong>
                  <span>
                    Define inputs, expected outputs, and time limits once per
                    question — reusable across cohorts.
                  </span>
                </li>
                <li>
                  <strong>Submissions run in sandbox</strong>
                  <span>
                    Each submission executes in an isolated environment against
                    every configured test case.
                  </span>
                </li>
                <li>
                  <strong>Results surface instantly</strong>
                  <span>
                    Pass/fail per case, runtime, and a score appear before
                    the exam window closes.
                  </span>
                </li>
              </ol>
            </div>

            <div className="pcod-side-block">
              <div className="caption">What it covers</div>
              <ul className="pcod-bullets">
                <li>
                  Multiple languages — Python, Java, C++, JavaScript, and more,
                  without extra setup per course.
                </li>
                <li>
                  Partial credit — scoring on test-case weight, not all-or-nothing
                  binary outcomes.
                </li>
                <li>
                  Full audit trail — same rubric evidence as descriptive answers.
                  Defensible at appeal.
                </li>
              </ul>
            </div>
          </aside>
        </div>

        <div className="pcod-stats">
          {STATS.map(({ num, cap }, i) => (
            <div key={cap} className="pcod-stat">
              <div className="pcod-stat-num">{num}</div>
              <div className="pcod-stat-cap">{cap}</div>
              {i < STATS.length - 1 && <div className="pcod-stat-div" />}
            </div>
          ))}
        </div>
      </div>

      <PageFooter chapter="Code & Compile" />
    </div>
  );
}
