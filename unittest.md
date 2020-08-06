title: Python From Scratch
speaker: yangxinming
transition: cards
prismTheme: dark
css:
    - css/base.css
    - css/gh-fork-ribbon.min.css
js:
    - js/zoom.js
    - js/base.js
plugins:
    - echarts
    - mermaid
    - katex


<slide class="bg-black-blue aligncenter zoomIn">

# Python From Scratch {.text-shadow}

By ![](https://avatars3.githubusercontent.com/u/73510?s=60&u=200063d372fefbd51de767b8e258de0024d45e52&v=4){.avatar-40} YangXinMing \[SCG-NP-IDEA\] {.text-intro}

<slide class="aligncenter fullscreen">
## Agenda {.zoomIn}
<br>
:::div {.mydiv}
 * basic usage {.bounceInRight}
 * 目的，目标
 	* 结构，components and interconnect {.bounceInRight}
    * 技巧 {.bounceInRight}
    * 改造，学习提升的地方，或者觉的不好的地方，和其他框架的比较 {.bounceInRight}
 * q&a {.bounceInRight}
{.build.description.text-intro}
:::

<slide class="aligncenter fullscreen">
### basics - general {.zoomIn}
<br>
:::div {.mydiv}
* from JUnit Smalltalk testing framework  {.animated.zoomIn}
* contains {.animated.zoomIn}
	* test case and suite class {.animated.zoomIn}
    * text-based utility class for running the tests and reporting the results
 (TextTestRunner)
* docs : http://docs.python.org/library/unittest.html
{.build.description.text-intro}
:::


<slide class="aligncenter fullscreen">
### basic - usage{.zoomIn}
```python
    import unittest

    class IntegerArithmeticTestCase(unittest.TestCase):
        def testAdd(self):  # test method names begin with 'test'
            self.assertEqual((1 + 2), 3)
            self.assertEqual(0 + 1, 1)
        def testMultiply(self):
            self.assertEqual((0 * 10), 0)
            self.assertEqual((5 * 8), 40)

    if __name__ == '__main__':
        unittest.main()
```

<slide class="aligncenter fullscreen">
### basic - suite {.zoomIn}
```python
def suite():
    suite = unittest.TestSuite()
    suite.addTest(WidgetTestCase('test_default_widget_size'))
    suite.addTest(WidgetTestCase('test_widget_resize'))
    return suite

if __name__ == '__main__':
    runner = unittest.TextTestRunner()
    runner.run(suite())
```
<slide class="aligncenter fullscreen">
### main {.zoomIn}
```python

    def createTests(self, from_discovery=False, Loader=None):
        if self.testNamePatterns:
            self.testLoader.testNamePatterns = self.testNamePatterns
        if from_discovery:
            loader = self.testLoader if Loader is None else Loader()
            self.test = loader.discover(self.start, self.pattern, self.top)
        elif self.testNames is None:
            self.test = self.testLoader.loadTestsFromModule(self.module)
        else:
            self.test = self.testLoader.loadTestsFromNames(self.testNames,
                                                           self.module)


    self.result = testRunner.run(self.test)

```


<slide class="aligncenter fullscreen">
### files and components {.zoomIn}

<img src="/img/unitest_code.png" class="aligncenter fadeInUp size-20" onclick="myfunction(this)">

<slide class="aligncenter fullscreen">
### fixture
 * setUpClass and tearDownClass
 * setUpModule and tearDownModule


<slide class="aligncenter fullscreen">
###  loader -> loaded_suite = self.suiteClass(map(testCaseClass, testCaseNames))
 * 支持从多种源加载测试
 * 返回测试的实例（每个测试实例包含了setup, teardown, testMethod(runTest or test_xxx))
```python

    def loadTestsFromTestCase(self, testCaseClass):
        """Return a suite of all test cases contained in testCaseClass"""
        if issubclass(testCaseClass, suite.TestSuite):
            raise TypeError("Test cases should not be derived from "
                            "TestSuite. Maybe you meant to derive from "
                            "TestCase?")
        testCaseNames = self.getTestCaseNames(testCaseClass)
        if not testCaseNames and hasattr(testCaseClass, 'runTest'):
            testCaseNames = ['runTest']
        loaded_suite = self.suiteClass(map(testCaseClass, testCaseNames))
        return loaded_suite


	loadTestsFromModule
	loadTestsFromName
	loadTestsFromNames

```

<slide class="aligncenter fullscreen">
### runner : 执行，拿到case(suite) -> 执行test(result) -> 更新result
  * suite(result)
  * testcase(result)

:::column {.aligncenter}

```python

class TextTestRunner(object):

    def run(self, test):
            try:
                test(result)

```

----

```python
    def __call__(self, *args, **kwds):
        return self.run(*args, **kwds)
```




<slide class="aligncenter fullscreen">
### suite & testcase {.zoomIn}
```python
    def run(self, result):
        for index, test in enumerate(self):
            if result.shouldStop:
                break
            test(result)
            if self._cleanup:
                self._removeTestAtIndex(index)
        return result
```


<slide class="aligncenter fullscreen">
### result\: {.zoomIn}
 * Holder for test result information. --> 容纳测试的结果信息.

:::column {.aligncenter}
```python
    def __init__(self, stream=None, descriptions=None, verbosity=None):
        self.failfast = False
        self.failures = []
        self.errors = []
        self.testsRun = 0
        self.skipped = []
        self.expectedFailures = []
        self.unexpectedSuccesses = []
        self.shouldStop = False
        self.buffer = False
        self.tb_locals = False
		...
```
----

```python
def failfast(method):
    def inner(self, *args, **kw):
    def __init__(self, stream=None, descriptions=None, verbosity=None):
    def printErrors(self):
    def startTest(self, test):
    def _setupStdout(self):
    def startTestRun(self):
    def stopTest(self, test):
    def _restoreStdout(self):
    def stopTestRun(self):
    def addError(self, test, err):
    def addFailure(self, test, err):
    def addSubTest(self, test, subtest, err):
    def addSuccess(self, test):
    def addSkip(self, test, reason):
    def addExpectedFailure(self, test, err):
    def addUnexpectedSuccess(self, test):
    def wasSuccessful(self):
    def stop(self):
    def _exc_info_to_string(self, err, test):
    def _is_relevant_tb_level(self, tb):
    def _count_relevant_tb_levels(self, tb):
```

<slide class="aligncenter fullscreen">
### fastfail -> 当存在不同类型的错误，然后这些错误的时候，都有可能需要停止测试\: {.zoomIn}
```python
def failfast(method):
    @wraps(method)
    def inner(self, *args, **kw):
        if getattr(self, 'failfast', False):
            self.stop()
        return method(self, *args, **kw)
    return inner

@failfast
def addError(self, test, err):


@failfast
def addFailure(self, test, err):

```

<slide class="aligncenter fullscreen">
### case & result\: {.zoomIn}

```python
def run:
		testMethod = getattr(self, self._testMethodName)
        # ... expecting_failure_method = getattr(testMethod,
        outcome = _Outcome(result)
        try:
            self._outcome = outcome

            with outcome.testPartExecutor(self):
                self.setUp()
            if outcome.success:
                outcome.expecting_failure = expecting_failure
                with outcome.testPartExecutor(self, isTest=True):
                    testMethod()
                outcome.expecting_failure = False
                with outcome.testPartExecutor(self):
                    self.tearDown()

            self.doCleanups()
            for test, reason in outcome.skipped:
                self._addSkip(result, test, reason)
            self._feedErrorsToResult(result, outcome.errors)
            if outcome.success:
                if expecting_failure:
                    if outcome.expectedFailure:
                        self._addExpectedFailure(result, outcome.expectedFailure)
                    else:
                        self._addUnexpectedSuccess(result)
                else:
                    result.addSuccess(self)
            return result
        finally:
            result.stopTest(self)
            if orig_result is None:
                stopTestRun = getattr(result, 'stopTestRun', None)
                if stopTestRun is not None:
                    stopTestRun()

            # explicitly break reference cycles:
            # outcome.errors -> frame -> outcome -> outcome.errors
            # outcome.expectedFailure -> frame -> outcome -> outcome.expectedFailure
            outcome.errors.clear()
            outcome.expectedFailure = None

            # clear the outcome, no more needed
            self._outcome = None
```

<slide class="aligncenter fullscreen">
### case & result \: Outcome \: {.zoomIn}
 * Outcome 存储一个case的结果，由于需要处理不同阶段setup,runTest,teardown -> contextmanager
 * case 都是通过exception 与Outcome交互
```python
class _Outcome(object):
    def __init__(self, result=None):
        self.expecting_failure = False
        self.result = result
        self.result_supports_subtests = hasattr(result, "addSubTest")
        self.success = True
        self.skipped = []
        self.expectedFailure = None
        self.errors = []

    @contextlib.contextmanager
    def testPartExecutor(self, test_case, isTest=False):
        old_success = self.success
        self.success = True
        try:
            yield
        except KeyboardInterrupt:
            raise
        except SkipTest as e:
            self.success = False
            self.skipped.append((test_case, str(e)))
        except _ShouldStop:
            pass
        except:
            exc_info = sys.exc_info()
            if self.expecting_failure:
                self.expectedFailure = exc_info
            else:
                self.success = False
                self.errors.append((test_case, exc_info))
            # explicitly break a reference cycle:
            # exc_info -> frame -> exc_info
            exc_info = None
        else:
            if self.result_supports_subtests and self.success:
                self.errors.append((test_case, None))
        finally:
            self.success = self.success and old_success

```

<slide class="aligncenter fullscreen">
### FunctionTest: 已经存在的test function -> 构建成unittest testcase {.zoomIn}
```python

class FunctionTestCase(TestCase):

    def __init__(self, testFunc, setUp=None, tearDown=None, description=None):
        super(FunctionTestCase, self).__init__()
        self._setUpFunc = setUp
        self._tearDownFunc = tearDown
        self._testFunc = testFunc
        self._description = description


```

<slide class="aligncenter fullscreen">
### subTest context {.zoomIn}
 * subTest : A failure in the subtest marks the test case as failed but resumes execution at the end of the enclosed block, allowing further test code to be executed.
 * try catch

:::column {.aligncenter}

```python
import unittest

class TestsContainer(unittest.TestCase):
    longMessage = True

    testsmap = {
        'foo': [1, 1],
        'bar': [1, 2],
        'baz': [5, 5],
        'baf': [5, 6],
    }

    def test_a(self):
        for name, (a, b) in self.testsmap.items():
            with self.subTest(name=name):
                self.assertEqual(a, b, name)

if __name__ == '__main__':
    unittest.main()
```

----

```python
======================================================================
FAIL: test_a (__main__.TestsContainer) (name='bar')
----------------------------------------------------------------------
Traceback (most recent call last):
  File "/tmp/x.py", line 16, in test_a
    self.assertEqual(a, b, name)
AssertionError: 1 != 2 : bar

======================================================================
FAIL: test_a (__main__.TestsContainer) (name='baf')
----------------------------------------------------------------------
Traceback (most recent call last):
  File "/tmp/x.py", line 16, in test_a
    self.assertEqual(a, b, name)
AssertionError: 5 != 6 : baf

----------------------------------------------------------------------
Ran 1 test in 0.001s

FAILED (failures=2)
```


<slide class="aligncenter fullscreen">
### subTest context {.zoomIn}

```python
    def subTest(self, msg=_subtest_msg_sentinel, **params):
        """Return a context manager that will return the enclosed block
        of code in a subtest identified by the optional message and
        keyword parameters.  A failure in the subtest marks the test
        case as failed but resumes execution at the end of the enclosed
        block, allowing further test code to be executed.
        """
        if not self._outcome.result_supports_subtests:
            yield
            return
        parent = self._subtest
        if parent is None:
            params_map = _OrderedChainMap(params)
        else:
            params_map = parent.params.new_child(params)
        self._subtest = _SubTest(self, msg, params_map)
        try:
            with self._outcome.testPartExecutor(self._subtest, isTest=True):
                yield
            if not self._outcome.success:
                result = self._outcome.result
                if result is not None and result.failfast:
                    raise _ShouldStop
            elif self._outcome.expectedFailure:
                # If the test is expecting a failure, we really want to
                # stop now and register the expected failure.
                raise _ShouldStop
        finally:
            self._subtest = parent

```


<slide class="aligncenter fullscreen">
### Mock : It allows you to replace parts of your system under test with mock objects and make assertions about how they have been used. {.zoomIn}

```python

>>> from unittest.mock import MagicMock
>>> mock = MagicMock(return_value=3)
>>> # or
>>> # mock = MagicMock()
>>> # mock.return_value = 3
>>> mock()
3
```


<slide class="aligncenter fullscreen">
### Thanks
