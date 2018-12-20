# urllib3

> urllib3 is a powerful, sanity-friendly HTTP client for Python.

## Usage

Install with pip `$ pip install urllib3`

easy to use:
```python
import urllib3
http = urllib3.PoolManager()
r = http.request('GET', 'http://www.google.com')
print(r.status)
print(r.data)
``` 

### Basic User Guide

#### Request data

__Headers__

You can specify headers as a dictionary in the headers argument in request():
```python
r = http.request( 'GET', 'http://httpbin.org/headers',
        headers={ 'X-Something': 'value' })
json.loads(r.data.decode('utf-8'))['headers']
```
__Query parameterss__

For GET, HEAD, and DELETE requests, you can simply pass the arguments as a dictionary in the fields argument to request():
```python
r = http.request( 'GET','http://httpbin.org/get',
    fields={'arg': 'value'})
json.loads(r.data.decode('utf-8'))['args']
```

For POST and PUT requests, manually encode query parameters
```python
from urllib.parse import urlencode
encoded_args = urlencode({'arg': 'value'})
url = 'http://httpbin.org/post?' + encoded_args
r = http.request('POST', url)
json.loads(r.data.decode('utf-8'))['args']
```


For PUT and POST requests,  form-encode the dictionary in the fields argument
```python
r = http.request( 'POST', 'http://httpbin.org/post',
fields={'field': 'value'})
json.loads(r.data.decode('utf-8'))['form']
```

__JSON__
```python

import json
data = {'attribute': 'value'}
encoded_data = json.dumps(data).encode('utf-8')
r = http.request('POST', 'http://httpbin.org/post',
    body=encoded_data,headers={'Content-Type': 'application/json'})
json.loads(r.data.decode('utf-8'))['json']

```
__Files & binary data__

```python
with open('example.txt') as fp:
    file_data = fp.read()   
    r = http.request('POST', 'http://httpbin.org/post',
        fields={ 'filefield': ('example.txt', file_data)})
    json.loads(r.data.decode('utf-8'))['files']
```
pass a third item in the tuple to specify the file’s MIME type explicitly:

```python
r = http.request( 'POST', 'http://httpbin.org/post',
    fields={ 'filefield': ('example.txt', file_data, 'text/plain'),})`
```

For sending raw binary data simply specify the body argument. It’s also recommended to set the Content-Type header:

```python
with open('example.jpg', 'rb') as fp:
    file_data = fp.read()
    binary_data = fp.read()
    r = http.request('POST', 'http://httpbin.org/post',
        body=binary_data,
        headers={'Content-Type': 'image/jpeg'})
    json.loads(r.data.decode('utf-8'))['files']
```

#### Certificate verification

to enable verification you will need a set of root certificates. `pip install certifi`

install certifi along with urllib3 by using the secure extra: `pip install urllib3[secure]`

```
import certifi
import urllib3
http = urllib3.PoolManager( cert_reqs='CERT_REQUIRED', ca_certs=certifi.where())
http.request('GET', 'https://google.com')
```
The PoolManager will automatically handle certificate verification and will raise SSLError if verification fails:


#### Using timeouts
Timeouts allow you to control how long requests are allowed to run before being aborted. 
```python

http.request('GET', 'http://httpbin.org/delay/3', timeout=4.0)

# separate connect and read timeouts:
http.request( 'GET', 'http://httpbin.org/delay/3', timeout=urllib3.Timeout(connect=1.0))

# be subject to the same timeout
http = urllib3.PoolManager(timeout=3.0)
http = urllib3.PoolManager( timeout=urllib3.Timeout(connect=1.0, read=2.0))
```

#### Retrying requests

urllib3 can automatically retry idempotent requests. 
This same mechanism also handles redirects. 
You can control the retries using the retries parameter to request(). 
By default, urllib3 will retry requests 3 times and follow up to 3 redirects.

```python

http.requests('GET', 'http://httpbin.org/ip', retries=10)
```
To disable all retry and redirect logic specify retries=False:

```python
http.request('GET', 'http://nxdomain.example.com', retries=False)
r = http.request( 'GET', 'http://httpbin.org/redirect/1', retries=False)

# To disable redirects but keep the retrying logic, specify redirect=False:
r = http.request( 'GET', 'http://httpbin.org/redirect/1', redirect=False)

# use a Retry instance.
http.request( 'GET', 'http://httpbin.org/redirect/3', retries=urllib3.Retry(3, redirect=2))
r = http.request( 'GET', 'http://httpbin.org/redirect/3', retries=urllib3.Retry(redirect=2, raise_on_redirect=False))

```

be subject to the same retry policy

```python
http = urllib3.PoolManager(retries=False)
http = urllib3.PoolManager( retries=urllib3.Retry(5, redirect=2))
```

#### Errors & Exceptions

urllib3 wraps lower-level exceptions, for example:

```python
try:
    http.request('GET', 'nx.example.com', retries=False)
except urllib3.exceptions.NewConnectionError:
    print('Connection failed.')
```

Logging
```
logging.getLogger("urllib3").setLevel(logging.WARNING)
```

### Advanced Usage

__Customizing pool behavior__

keep a maximum of 10 ConnectionPool instances
```python
import urllib3
http = urllib3.PoolManager(num_pools=50)
```
the ConnectionPool class keeps a pool of individual HTTPConnection instances. These connections are used during an individual request and returned to the pool when the request is complete.
 
```python
import urllib3
http = urllib3.PoolManager(maxsize=10)
# Alternatively
http = urllib3.HTTPConnectionPool('google.com', maxsize=10)
``` 


The behavior of the pooling for ConnectionPool is different from PoolManager. 
By default, if a new request is made and there is no free connection in the pool then a new connection will be created. However, this connection will not be saved if more than maxsize connections exist. This means that maxsize does not determine the maximum number of connections that can be open to a particular host, just the maximum number of connections to keep in the pool.
 
 However, if you specify block=True then there can be at most maxsize connections open to a particular host:
```python
http = urllib3.PoolManager(maxsize=10, block=True)
# Alternatively
http = urllib3.HTTPConnectionPool('google.com', maxsize=10, block=True)

```

__Streaming and IO__

When dealing with large responses it’s often better to stream the response content:

```python
import urllib3
http = urllib3.PoolManager()
r = http.request( 'GET', 'http://httpbin.org/bytes/1024', preload_content=False)
for chunk in r.stream(32):
    print(chunk)
r.release_conn()
```

> NoteWhen using preload_content=False, you should call release_conn() to release the http connection back to the connection pool so that it can be re-used.

treat the HTTPResponse instance as a file-like object.

r = http.request( 'GET', 'http://httpbin.org/bytes/1024',
preload_content=False)
r.read(4)


Calls to read() will block until more response data is available.

import io
reader = io.BufferedReader(r, 8)
reader.read(4)
r.release_conn()

You can use this file-like object to do things like decode the content using codecs:

import codecs
reader = codecs.getreader('utf-8')
r = http.request( 'GET', 'http://httpbin.org/ip', preload_content=False)
json.load(reader(r))
r.release_conn()

__Proxies__

use ProxyManager to tunnel requests through an HTTP proxy:

```python
import urllib3
proxy = urllib3.ProxyManager('http://localhost:3128/')
proxy.request('GET', 'http://google.com/')
```

You can use SOCKSProxyManager to connect to SOCKS4 or SOCKS5 proxies. `pip install urllib3[socks]`

```python

from urllib3.contrib.socks import SOCKSProxyManager
proxy = SOCKSProxyManager('socks5://localhost:8889/')
proxy.request('GET', 'http://google.com/')
```

__Custom SSL certificates and client certificates__

```python
import urllib3
http = urllib3.PoolManager(cert_reqs='CERT_REQUIRED', ca_certs='/path/to/your/certificate_bundle')

# To use a client certificate, provide the full path when creating a PoolManager:

http = urllib3.PoolManager( cert_file='/path/to/your/client_cert.pem',
        cert_reqs='CERT_REQUIRED',
        ca_certs='/path/to/your/certificate_bundle')
```

__SSL Warnings__

urllib3 will issue several different warnings based on the level of certificate verification support.

```python
import urllib3
urllib3.disable_warnings()
# Alternatively
logging.captureWarnings(True)
```

#### Google App Engine
If you’re using the Flexible environment, you do not have to do any configuration- urllib3 will just work. 
__To use AppEngineManager__:
```python
from urllib3.contrib.appengine import AppEngineManager
http = AppEngineManager()
http.request('GET', 'https://google.com/')
```

__To use the Sockets API__: add the following to your app.yaml and use PoolManager as usual:

```python
env_variables:
    GAE_USE_SOCKETS_HTTPLIB : 'true'
```

For more details in [urllib3.contrib.appengine](https://urllib3.readthedocs.io/en/latest/reference/urllib3.contrib.html#module-urllib3.contrib.appengine).




## 参考 

* [urllib docs](https://urllib3.readthedocs.io/en/latest/)

* [urlib github](https://github.com/urllib3/urllib3)