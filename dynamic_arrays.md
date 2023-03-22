
[Main](README.md) > Dynamic Arrays

# Dynamic arrays

Sample 1

* [ ] item is a reference
* [ ] item is a owned  reference
* [x] item is copied
* [ ] item is moved
* [ ] item needs destructor
* [x] cheap copy (int, double etc..)

```c
struct items {
  int* data;
  int  size;
  int  capacity;
}
```
[source → ](array1.md)

Sample 2

* [ ] item is a reference
* [ ] item is a owned  reference
* [x] item is copied
* [ ] item needs destructor


```c
struct book {
    char title[10];
};

struct books {
    struct book* data; /*array of books*/
    int size;
    int capacity;
};

```
[source → ](array2.md)

Sample 3

* [ ] item is a reference
* [ ] item is a owned  reference
* [ ] item is copied
* [x] item is moved
* [x] item needs destructor

```c
struct book {
    char* title;
};

void book_destroy(struct book* book) {
    free(book->title);
}
struct books {
    struct book* data; /*array of books*/
    int size;
    int capacity;
};
```
[source → ](array3.md)


Sample 4 

* [ ] item is a reference
* [x] item is a owned  reference
* [ ] item is copied
* [x] item is moved
* [ ] item is unconditionally moved
* [x] item needs destructor

```c
struct book {
    char* title;
};

void book_destroy(struct book* book) {
    free(book->title);
}
struct books {
    struct book** data; /*array of onwer pointers of books*/
    int size;
    int capacity;
};
```
[source → ](array4.md)


Sample 5

* [ ] item is a reference
* [x] item is a owned  reference
* [ ] item is copied
* [x] item is moved
* [x] item is unconditionally moved
* [x] item needs destructor


```c
struct book {
    char* title;
};

void book_destroy(struct book* book) {
    free(book->title);
}
struct books {
    struct book** data; /*array of onwer pointers of books*/
    int size;
    int capacity;
};
```
[source → ](array5.md)
