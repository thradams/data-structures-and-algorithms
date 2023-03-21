
[Main](README.md) > Dynamic Arrays

# Dynamic arrays

Sample 1 - dynamic arrays of ints

```c
struct items {
  int* data;
  int  size;
  int  capacity;
}
```
[source → ](array1.md)

Sample 2 - dynamic arrays of books. book is copied.

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

Sample 3 - dynamic arrays of books. book is moved into the array.

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


Sample 4 - dynamic arrays of onwer pointer of books. onwership transfered

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

